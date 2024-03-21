import socketio
import json
import time
import random

# Create a Socket.IO client
sio = socketio.Client()
success_count = 0
fail_count =0
# Define the event handler for the 'connect' event
@sio.event
def connect():
    print("Connected to server")

# Define the event handler for the 'disconnect' event
@sio.event
def disconnect():
    # print("Disconnected from server")
    print("Mold shots protector9: ",success_count)
    print("failed shots protector9: ",fail_count)

# Define a custom event handler for a custom event
@sio.event
def custom_event(data):
    print("Custom event received:", data)

# Connect to the Socket.IO server
sio.connect('http://localhost:3001')  # Replace with your server's address




protector_id = "Protector9"  # Unique identifier for the machine

# for the first time data entry --> config 

# config load-->  run

# Sending data along with machine_id for the init type
sio.emit('protector', {
  'protector_id': protector_id,
  'type': "init",
  'data': {
    'machineID': 9,
    'moldMaker': "Maker9",
    'moldMaterial': "ABS",
    'moldProtector': protector_id,
    'monaNumber': "M#129"
  }
})
time.sleep(10)

# Sending data along with machine_id for the run type
while True:

    count = 0
    while (count <=10):
        success = random.choice([1,0])
        # Sending data along with machine_id
        if(success ==1):
            success_count+=1
        sio.emit('protector', {'protector_id': protector_id, 'type': "run", "data": { 'success': success}})
        if(success == 0):
            fail_count+=1
            sio.emit('protector', {'protector_id': protector_id, 'type': "status", "data": {'status': "stuck"} })
            time.sleep(12)

            sio.emit('protector', {'protector_id': protector_id, 'type': "status", "data": {'status': "working" }})       
                
            
        time.sleep(12)
        count+=1
    sio.emit('protector', {'protector_id': protector_id, 'type': "status", "data": {'status': "notWorking"} })
    time.sleep(10)

sio.wait()
