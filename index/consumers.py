import json
from channels.generic.websocket import WebsocketConsumer
from channels.auth import login
from asgiref.sync import async_to_sync
import redis
import time

class CodeConsumer(WebsocketConsumer):

    # pool = None
    # r = None

    # def __init__(self):
    #     self.pool = redis.ConnectionPool(host='127.0.0.1', port=6379)
    #     self.r = redis.Redis(connection_pool=self.pool)

    def connect(self):
        print("link up")
        self.uid = self.scope['url_route']['kwargs']['uid']
        r = redis.Redis(host='127.0.0.1', port=6379)
        # self.group_name = "students_group"
        if self.uid[0] == "s": #websocket client is student type
            self.group_name = "students_group"
            r.sadd('students_set', self.uid)
            print(r.smembers('students_set'))
            import time
            time = time.localtime(time.time())
            timestamp = str(time.tm_year) + "/" + str(time.tm_mon) + "/" + str(time.tm_mday) + " " + str(time.tm_hour) + ":" + str(time.tm_min) + ":" + str(time.tm_sec)
            r.set(self.uid + "start", timestamp)
            r.set(self.uid + "end", timestamp)
            # print(r.get(self.uid + "start"))
        if self.uid[0] == "t": #websocket client is teacher type
            self.group_name = "teachers_group"
        print(self.uid)

        #join students group
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )
        if (self.group_name == "students_group"):
            print("new student link up!")
            async_to_sync(self.channel_layer.group_send)(
                "teachers_group",
                {
                    'type': 'new_student_linkup',
                    'message': 'new student link up!'
                }
            )
        if self.group_name == "teachers_group": 
            #everytime a new teacher links up, server send every connected student a message asking for sending their
            #data and push to the new added teacher
            async_to_sync(self.channel_layer.group_send)(
                "students_group",
                {
                    'type': "new_teacher_linkup",
                    'message': "new teacher link up!",
                }
            )
            res = ""
            for student in r.smembers('students_set'):
                student = str(student, encoding='utf-8')
                # print(student)
                res = res + student + "登入时间"+ str(r.get(student + "start"), encoding = 'utf-8') + "\n" + student + "最后操作时间" + str(r.get(student + "end"), encoding = 'utf-8') + "\n"
            print(res)
            async_to_sync(self.channel_layer.group_send)(
                "teachers_group",
                {
                    'type': "send_logs_to_teacher",
                    'message': res,
                }
            )
        self.accept()

    def disconnect(self, close_code):
        #leave students group
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )
        print(self.uid + " disconnected")
        # print(self.uid)
        if self.uid[0] == "s":
            r = redis.Redis(host='127.0.0.1', port=6379)
            r.srem('students_set', self.uid)
        async_to_sync(self.channel_layer.group_send)(
            "teachers_group",
            {
                'type': 'close_notification',
                'message': self.uid,
            }
        )

    def receive(self, text_data):
        # print(text_data)
        if text_data == "Heartbeat Check":
            #heartbeat check message
            self.send("Heartbeat Checked")
            return

        text_data_json = json.loads(text_data) #convert json_string to python dict
        # print(self.scope['url_route']['kwargs']['uid'])
        self.uid = self.scope['url_route']['kwargs']['uid']
        print("self.uid: " + self.uid)
        r = redis.Redis(host='127.0.0.1', port=6379)
        import time
        time = time.localtime(time.time())
        timestamp = str(time.tm_year) + "/" + str(time.tm_mon) + "/" + str(time.tm_mday) + " " + str(time.tm_hour) + ":" + str(time.tm_min) + ":" + str(time.tm_sec)
        r.set(self.uid + "end", timestamp)
        # print(r.get(self.uid + "end"))

        # Send message to teacher group
        if self.uid[0] == "s":
            async_to_sync(self.channel_layer.group_send)(
                "teachers_group",
                {   
                    'type': 'teacher_message',
                    # 'message': self.uid + "\n" + text_data,
                    'message': text_data,
                }   
            )
        #Send message to students group (teacher is sharing his code)
        if self.uid[0] == "t":
            print("code share content: ", text_data)
            async_to_sync(self.channel_layer.group_send)(
                "students_group",
                {
                    'type': 'share_code_to_student',
                    'message': text_data,
                }
            )
    # Receive message from room group
    def teacher_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            # 'uid': message.split('\n')[0],
        }))

    #tell teachers a student has disconnected
    def close_notification(self, event):
        message = event['message']

        self.send(text_data=json.dumps({
            'uid': message,
            'message': 'Close!',
        }))
    
    #tell students a new teacher links up
    def new_teacher_linkup(self, event):
        message = event['message']

        self.send(text_data=json.dumps({
            'message': message,
        }))
    
    def new_student_linkup(self, event):
        message = event['message']

        self.send(text_data=json.dumps({
            'message': message,
        }))

    def send_logs_to_teacher(self, event):
        message = event['message']

        self.send(text_data=json.dumps({
            'message': message,
        }))

    def share_code_to_student(self, event):
        message = event['message']

        self.send(text_data=json.dumps({
            'message': message,
        }))