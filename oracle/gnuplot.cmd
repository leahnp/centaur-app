set terminal jpeg size 1024, 768 enhanced
plot 'predict/general-785482-proba.dat' using 1:2 title 'walk' with line lc rgb 'red', 	           'predict/general-785482-proba.dat' using 1:3 title 'trot' with line lc rgb 'green', 	           'predict/general-785482-proba.dat' using 1:4 title 'canter' with line lc rgb 'blue'
