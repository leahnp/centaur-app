import sys

# for user predict data, runs when called from predict.py
# data is array of user motion info
def run_process(data):
	output = []
	first_line = True
	first_ms = 0
	default_label = 4

	for row in data:
		ms = row[0]

		if first_line == True:
		    first_ms = ms
		    first_line = False

		row[0] = (ms - first_ms) / 1000.0;
		output.append([row[0], row[1], row[2], row[3], default_label])

	return output
		




# for training data, runs if called from terminal
# if __name__ == '__main__':
# 	in_data = []
# 	for line in sys.stdin:
# 		#might need to make subarray?
# 		in_data.append([line])
# 	print(run_process(in_data))

