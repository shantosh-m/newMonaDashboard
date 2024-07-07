import importlib
import multiprocessing
import time
import sys

import os

def run_protector(protector_id):
    try:
        protector_module = importlib.import_module(f'Protector{protector_id}')
        protector_module.run()
    except ImportError:
        print(f"Protector{protector_id}.py not found.")

if __name__ == "__main__":
    processes = []
    sys.path.append(os.getcwd())
    print("current path",os.getcwd())

    while True:
        protector_id_input = input("Enter protector ID to run (or 'q' to quit): ")
        if protector_id_input.lower() == 'q':
            break

        try:
            protector_id = int(protector_id_input)
            process = multiprocessing.Process(target=run_protector, args=(protector_id,))
            processes.append(process)
            process.start()
        except ValueError:
            print("Invalid input. Please enter a valid protector ID.")

    for process in processes:
        process.join()
