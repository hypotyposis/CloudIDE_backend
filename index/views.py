from django.shortcuts import render
# from index.models import Message, Progress
from django.template import loader,Context
from django.http import HttpResponse, JsonResponse
import json
from utils.api import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import traceback
# from aliyunsdkcore.client import AcsClient
# from aliyunsdkvod.request.v20170321 import GetPlayInfoRequest, GetVideoPlayAuthRequest
from multiprocessing import Process
import subprocess
import docker
from django.conf import settings
import redis
import requests

# Create your views here.

class CodeAPI(APIView):
    
    def post(self, request):
        if request.method == "POST":
            code_value = json.loads(request.body).get("code")
            cin_value = json.loads(request.body).get("cin")
            timestamp = str(json.loads(request.body).get("timestamp"))
            language = json.loads(request.body).get("language")
            print(cin_value)
            print(code_value)
            print(timestamp)
            print(language)

            language_postfix = {"python": ".py", "cpp": ".cpp"}
            print(language_postfix["python"])
            # f = open("./compile/1.in", "w")
            f = open("./compile/"+timestamp+".in", "w")
            f.write(cin_value)
            f.close()
            # f = open("./compile/1.cpp", "w")
            f = open("./compile/"+timestamp+language_postfix[language], "w")
            f.write(code_value)
            f.close()

            # p = subprocess.Popen(args="timeout -s 9 2s ./compile/compileandrun.sh"+" "+timestamp, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
            compiler_url = "http://127.0.0.1:5000/compile"
            payload = {"code": code_value, "cin": cin_value, "timestamp": timestamp, "language": language}
            r = requests.post(compiler_url, data=payload)
            res = r.text
            print(type(res))
            print(res)
            return HttpResponse(json.dumps(res))

        #     out_put_logs = []
        #     while p.poll() is None:
        #         out_put_log = str(p.stdout.readline(), encoding = "utf-8")
        #         # print(out_put_log)
        #         out_put_logs.append(out_put_log)
            
        #     print(p.returncode)
        #     if p.returncode != 0:
        #         return HttpResponse("运行超时！")

        #     log = open("./compile/"+timestamp+".log", "w")
        #     log.writelines(out_put_logs)
        #     log.close()
            
        #     log = open("./compile/"+timestamp+".log", "r")
        #     # print(type(log.read()))
        #     # print(log.read())
        #     res = log.read()
        #     # print(type(res))
        #     print(res)
        #     return HttpResponse(res)

        # return HttpResponse("POST success")

    def get(self, request):
        log = open("./compile/log.txt", "r")
        return HttpResponse(log.read())

class CodeMonitor(APIView):

    pool = None
    r = None

    def __init__(self):
        self.pool = redis.ConnectionPool(host='127.0.0.1', port=6379)
        self.r = redis.Redis(connection_pool=self.pool)

    def post(self, request):
        if request.method == "POST":
            # generate a username automatically and return
            usertype = json.loads(request.body).get("usertype")
            if not (self.r.get(usertype)):
                self.r.set(usertype, 1)
            number = str(self.r.get(usertype), encoding = 'utf-8')
            uid = usertype + number
            self.r.set(usertype, int(number) + 1)
            return HttpResponse(uid)


        return HttpResponse("POST success")    