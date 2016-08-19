import sys

# for user predict data, runs when called from predict.py
# data is array of user motion info
output = []
def run_process(data):
	# print data
	# exit(0)
	first_line = True
	first_ms = 0

	for line in data:
		# print line
		# exit(0)
		# index 0: this will be a problem when trying to train data 
		split = line[0].rstrip().split(' ')
		ms = float(split[0])

		# if sys.argv[1]:
		# 	label = sys.argv[1]
		# else:
		label = 0

		if first_line == True:
		    first_ms = ms
		    first_line = False

		split[0] = str((ms - first_ms) / 1000.0);

		# new output to expand features
		# print('%s %s %s %s %s' % (split[0], split[1], split[2], split[3], label))
		output.append([split[0], split[1], split[2], split[3], label])
	return output
		




# for training data, runs if called from terminal
if __name__ == '__main__':
	in_data = []
	for line in sys.stdin:
		#might need to make subarray?
		in_data.append([line])
	print(run_process(in_data))

