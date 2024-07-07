import socketio
import time
import random
import multiprocessing

class MoldProtector:
    def __init__(self, protector_id, server_url):
        self.protector_id = protector_id
        self.server_url = server_url
        self.success_count = 0
        self.fail_count = 0
        self.sio = None

    def connect_to_server(self):
        self.sio = socketio.Client()

        # Define the event handler for the 'connect' event
        @self.sio.event
        def connect():
            print(f"Connected to server for {self.protector_id}")

        # Define the event handler for the 'disconnect' event
        @self.sio.event
        def disconnect():
            print(f"Mold shots {self.protector_id}: {self.success_count}")
            print(f"Failed shots {self.protector_id}: {self.fail_count}")

        # Define a custom event handler for a custom event
        @self.sio.event
        def custom_event(data):
            print(f"Custom event received for {self.protector_id}: {data}")

        try:
            self.sio.connect(self.server_url)
            self.initialize_protector()
        except socketio.exceptions.ConnectionError as e:
            print(f"Connection error for {self.protector_id}: {e}")
            time.sleep(5)
            self.connect_to_server()

    def initialize_protector(self):
        # Sending data along with machine_id for the init type
        self.sio.emit('protector', {
            'protector_id': self.protector_id,
            'type': "init",
            'data': {
                'machineID': 1,
                'moldMaker': "Maker1",
                'moldMaterial': "GPPS",
                'moldProtector': self.protector_id,
                'monaNumber': "M#123"
            }
        })
        time.sleep(2)

    def run(self):
        self.connect_to_server()

        # Sending data along with machine_id for the run type
        while True:
            count = 0
            while count <= 5:
                success = random.choice([1, 0])
                # Sending data along with machine_id
                self.sio.emit('protector', {
                    'protector_id': self.protector_id,
                    'type': "run",
                    'data': {
                        'success': success
                    }
                })
                if success == 1:
                    self.success_count += 1
                else:
                    self.fail_count += 1
                    self.sio.emit('protector', {
                        'protector_id': self.protector_id,
                        'type': "status",
                        'data': {
                            'status': "stuck"
                        }
                    })
                    time.sleep(10)
                    self.sio.emit('protector', {
                        'protector_id': self.protector_id,
                        'type': "status",
                        'data': {
                            'status': "working"
                        }
                    })
                time.sleep(5)
                count += 1
            self.sio.emit('protector', {
                'protector_id': self.protector_id,
                'type': "status",
                'data': {
                    'status': "notWorking"
                }
            })
            time.sleep(5)

def start_protector(protector_id, server_url):
    protector = MoldProtector(protector_id, server_url)
    protector.run()

if __name__ == "__main__":
    server_url = 'http://localhost:3001'

    process1 = multiprocessing.Process(target=start_protector, args=("Protector1", server_url))
    process2 = multiprocessing.Process(target=start_protector, args=("Protector2", server_url))
    
    process1.start()
    process2.start()
    
    process1.join()
    process2.join()
