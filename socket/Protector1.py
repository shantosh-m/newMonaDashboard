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




protector_id = "Protector1"  # Unique identifier for the machine

# for the first time data entry --> config 

# config load-->  run

# Sending data along with machine_id
sio.emit('protector', {'protector_id': protector_id, 'type': "init", 'data' : {}})
time.sleep(2)


while True:
    success = random.choice([True, False])
    # Sending data along with machine_id
    sio.emit('protector', {'protector_id': protector_id, 'type': "run", "data": { 'success': success}})
    time.sleep(2)


# red light
success = random.choice([True, False])
# Sending data along with machine_id
sio.emit('protector', {'protector_id': protector_id, 'type': "status", "data": {'status': "stuck"} })
         
# green  button
sio.emit('protector', {'protector_id': protector_id, 'type': "status", "data": {'status': "working" }})       
time.sleep(2)



# green light
# # errors 
# # status
#     working
#     not working
#     stuck


# Keep the client running
sio.wait()
