import importlib
import multiprocessing
import time

# Global flag to indicate whether the processes should continue running
running_flag = multiprocessing.Value('i', 1)  # 'i' for integer, initialized to 1 (True)

def run_protector(protector_id):
    try:
        protector_module = importlib.import_module(f'Protector{protector_id}')
        while running_flag.value:
            protector_module.run()
            time.sleep(1)  # Adjust as needed
    except ImportError:
        print(f"Protector{protector_id}.py not found.")
    except KeyboardInterrupt:
        pass  # Handle KeyboardInterrupt gracefully


def stop_program():
    global running_flag
    running_flag.value = 0

if __name__ == "__main__":
    processes = []

    for i in range(1, 21):
        protector_id = int(i)
        process = multiprocessing.Process(target=run_protector, args=(protector_id,))
        processes.append(process)
        process.start()

    # Wait for some time (for demonstration purposes)
    time.sleep(10)  # You can adjust this

    # Stop the program after waiting
    stop_program()

    for process in processes:
        process.join()
