import socketio
import json
import time
import random

# Create a Socket.IO client
sio = socketio.Client()

# Define the event handler for the 'connect' event
@sio.event
def connect():
    print("Connected to server")

# Define the event handler for the 'disconnect' event
@sio.event
def disconnect():
    print("Disconnected from server")

# Define a custom event handler for a custom event
@sio.event
def custom_event(data):
    print("Custom event received:", data)

# Connect to the Socket.IO server
sio.connect('http://localhost:3001')  # Replace with your server's address




protector_id = "Protector10"  # Unique identifier for the machine

# for the first time data entry --> config 

# config load-->  run

# Sending data along with machine_id for the init type
sio.emit('protector', {
  'protector_id': protector_id,
  'type': "init",
  'data': {
    'machineID': 10,
    'moldMaker': "Maker2",
    'moldMaterial': "SAAS",
    'moldProtector': protector_id,
    'monaNumber': "M#124"
  }
})
time.sleep(2)

# Sending data along with machine_id for the run type
while True:

    count = 0
    while (count <=5 ):
        success = random.choice([1,0])
        # Sending data along with machine_id
        sio.emit('protector', {'protector_id': protector_id, 'type': "run", "data": { 'success': success}})
        if(success == 0):
            sio.emit('protector', {'protector_id': protector_id, 'type': "status", "data": {'status': "stuck"} })
            time.sleep(10)

            sio.emit('protector', {'protector_id': protector_id, 'type': "status", "data": {'status': "working" }})       
                
            
        time.sleep(5)
        count+=1
    sio.emit('protector', {'protector_id': protector_id, 'type': "status", "data": {'status': "notWorking"} })
    time.sleep(5)
# # red light
# success = random.choice([True, False])
# # Sending data along with machine_id
         
# # green  button
# time.sleep(2)



# green light
# # errors 
# # status
#     working
#     not working
#     stuck


# Keep the client running
sio.wait()
