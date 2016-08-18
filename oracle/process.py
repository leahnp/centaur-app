import sys

# for user predict data, runs when called from predict.py
def run_process(data):
	first_line = True
	first_ms = 0
	
	for line in data:
		split = line.rstrip().split(' ')
		ms = float(split[0])

		if first_line == True:
		    first_ms = ms
		    first_line = False

		split[0] = str((ms - first_ms) / 1000.0);

		# new output to expand features
		print('%s %s %s %s %s' % (split[0], split[1], split[2], split[3]))


# for training data, runs if called from terminal
if __name__ == '__main__':
	label = sys.argv[1]
	for line in sys.stdin:
		split = line.rstrip().split(' ')
	print('%s %s %s %s %s' % (split[0], split[1], split[2], split[3], label))

