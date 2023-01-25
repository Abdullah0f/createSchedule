import random
x = [0]
a = ['Ana', 'Ashe', 'Baptiste', 'Bastion', 'Brigitte', 'Cassidy', 'D.Va', 'Doomfist', 'Echo', 'Genji', 'Hanzo', 'Junker Queen', 'Junkrat', 'Kiriko', 'Lúcio', 'Mei', 'Mercy', 'Moira', 'Orisa',
     'Pharah', 'Ramattra', 'Reaper', 'Reinhardt', 'Roadhog', 'Sigma', 'Sojourn', 'Soldier: 76', 'Sombra', 'Symmetra', 'Torbjörn', 'Tracer', 'Widowmaker', 'Winston', 'Wrecking Ball', 'Zarya', 'Zenyatta']
while (True):
    y = 0
    for i in range(2):
        while (y in x):
            y = random.choice(a)
        x.append(y)
        print(y)
    input("xxxx")


# random number between 1 and 36
