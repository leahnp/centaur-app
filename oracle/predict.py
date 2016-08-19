import sys
import numpy as np
from sklearn import datasets
from sklearn.neighbors import KNeighborsClassifier
from sklearn.externals import joblib 

# import functionality from following files
import process
import feature1
import feature2
import feature3

#make data array
data = []
# f = argv[1]
# for line in sys.stdin:
# with open(sys.stdin) as input_file:
#   for line in input_file:
for line in sys.stdin:
	print "heya pal"
	data.append([line])

# print data
# exit(0)
# process data
processed_data = process.run_process(data)

# run feat1
feature1_data = feature1.run_feature1(processed_data)

#run feat2
feature2_data = feature2.run_feature2(processed_data)

#run feat3
feature3_data = feature3.run_feature3(processed_data)

#zip features
features = zip(feature1_data, feature2_data, feature3_data)

#run run_predict()
predicted_data = run_predict(features)


def run_predict(features):
	if len(sys.argv[1]) < 2:
	  print "specify model file"
	  exit(1)

	model_filename = sys.argv[1]

	# load data from stdin
	samples = []
	features = []

	for line in sys.stdin:
	  split = line.rstrip().split(' ')
	  samples.append([float(split[0]), float(split[3])])
	  features.append([float(split[6]), float(split[8]), float(split[10])])

	# convert to numpy array
	features = np.array(features)

	# try to predict labels for the test data
	knn = joblib.load(model_filename)
	labels = knn.predict(features)

	for sample, label in zip(samples, labels):
	  print str(sample[0]) + ' ' + str(sample[1]) + ' ' + str(label) 

# for training data, runs if called from terminal
if __name__ == '__main__':
	in_data = []
	for line in sys.stdin:
		#might need to make subarray?
		in_data.append([line])
	print(run_predict(in_data))