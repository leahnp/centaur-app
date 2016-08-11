import sys

print 'secs\taccel'
for line in sys.stdin:
	split = line.rstrip().split(' ')


	print('%s\t%s' % (split[0], split[1]))

