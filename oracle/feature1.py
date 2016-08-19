# feature 1 - mean acceleration length

import math
import sys

WINDOW_LENGTH = 2.0

window_data = []
window_total = 0.0

def push_data(time, accel_len):
  global window_data, window_total
  window_data.append({ 'time': time, 'accel_len': accel_len })
  window_total += accel_len

def pop_data():
  global window_data, window_total
  head = window_data.pop(0)
  window_total -= head['accel_len']

def expire_data(window_end):
  global window_data, window_total
  window_begin = window_end - WINDOW_LENGTH
  while 1:
    head = window_data[0]
    if (head['time'] > window_begin):
      break
    pop_data()

def run_feature1(data):
  output = []
  # I don't know why this is working...(stdin not data)
  for split in data:
    # split = line.split(' ')
    time = float(split[0])
    accel = [float(split[1]), float(split[2]), float(split[3])]
    accel_len = math.sqrt(accel[0]*accel[0] + accel[1]*accel[1] + accel[2]*accel[2])
    # accel_normalized = [accel[0] / accel_len, accel[1] / accel_len, accel[2] / accel_len]

    # push new data to the window
    push_data(time, accel_len)

    # expire old data from the window
    expire_data(time)

    mean_accel_len = window_total / len(window_data)
    output.append([time, mean_accel_len])
  return output


  # for training data, runs if called from terminal
if __name__ == '__main__':
  in_data = []
  for line in sys.stdin:
    #might need to make subarray?
    in_data.append([line])
  print(run_feature1(in_data))
