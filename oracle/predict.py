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
  # print "heya pal"
  split = line.split(' ')
  time = float(split[0])
  x = float(split[1])
  y = float(split[2])
  z = float(split[3])
  data.append([time, x, y, z])

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

#zip processed data and all features
all_data = []
for i in xrange(len(processed_data)):
  all_data.append(processed_data[i] + feature1_data[i] + feature2_data[i] + feature3_data[i])


def run_predict(data):
  model_filename = 'oracle/model/knn'

  # load data from stdin
  samples = []
  features = []
  output = []

  for row in data:
    # for samples with time, zacell
    samples.append([row[0], row[3]])
    # for samples with time, feat1, feat2, feat3
    # samples.append([row[0], row[6], row[8], row[10]]) 
    features.append([row[6], row[8], row[10]])

  # convert to numpy array
  features = np.array(features)

  # try to predict labels for the test data
  knn = joblib.load(model_filename)
  labels = knn.predict(features)

  for sample, label in zip(samples, labels):
    # output with time, zaccel and label
    output.append([sample[0], sample[1], label])
    # output with time, feat1, feat2, feat3, label
    # output.append([sample[0], sample[1], sample[2], sample[3], label])

  return output


#run run_predict()
predicted_data = run_predict(all_data)
print predicted_data


# for training data, runs if called from terminal
# if __name__ == '__main__':
#   in_data = []
#   for line in sys.stdin:
#     #might need to make subarray?
#     in_data.append([line])
#   print(run_predict(in_data))