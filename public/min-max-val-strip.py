import sys

first = True
last_accel = 0.0
local_max = [0.0, 0.0]

for line in sys.stdin:
  split = line.split(' ')
  secs = float(split[0]) * 1000.0
  accel = float(split[1]) # / -16384.0) + 1.0
 
  if not first and (last_accel >= 0.0) != (accel >= 0.0):
    print('%f %f' % (local_max[0], local_max[1]))
    first = True
    last_accel = 0.0
    local_max = [0.0, 0.0]
    continue

  first = False
  last_accel = accel
  if (accel >= 0.0 and accel >= local_max[1]):
    local_max[0] = secs
    local_max[1] = accel
  elif (accel < 0.0 and accel <= local_max[1]):
    local_max[0] = secs
    local_max[1] = accel

