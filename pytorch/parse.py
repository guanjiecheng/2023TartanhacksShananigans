import csv
import torch
import torchvision
from torch.utils.data import Dataset, DataLoader
import numpy as np
import math

class MyDataset(Dataset):
    def __init__(self, data):
        self.x = torch.from_numpy(data[:, :-1])
        self.y = torch.from_numpy(data[:, -1])
        self.n_samples = data.shape[0]

    def __getitem__(self, index):
        return self.x[index], self.y[index]

    def __len__(self):
        return self.n_samples


# Shamelessly stolen from 10301 course
def load_feature_dictionary(file):
    word2vec_map = dict()
    with open(file) as f:
        read_file = csv.reader(f, delimiter='\t')
        for row in read_file:
            word, embedding = row[0], row[1:]
            word2vec_map[word] = np.array(embedding, dtype=float)
    return word2vec_map

# Given a sentence (in split, array form), return a feature vector
def vectorize_review(review, feat_dict):
    res = np.zeros(300)
    counter = 0
    for word in review:
        if word in feat_dict:
            counter += 1
            res = np.add(res, feat_dict[word])
    
    if counter != 0: res = res / counter
    return np.around(res, decimals=6)


def trim(data, feat_dict):
    result = np.zeros((len(data), 300))       
    
    for i in range(len(data)):  # for a sentence
        revSplit = data[i].lower().split()
        x_feat = vectorize_review(revSplit, feat_dict) # feature vector calculated with trimmed
        result[i, :] = x_feat
    
    return result

def mapper(arr):
    u = np.unique(arr)
    mapping = {string: i for i, string in enumerate(u)}
    return mapping

if __name__ == "__main__":
    data_np = np.loadtxt("test.csv", dtype='str', delimiter=',', skiprows=1, usecols=(1,2,3,4,5), max_rows=25)
    data_np[:,2] = np.apply_along_axis(lambda d: d[2] + d[3] + d[4], 1, data_np)
    data_np = np.delete(data_np, [3,4], 1)
    data_np[:,2] = np.char.strip(data_np[:,2], chars='"')
    data_np[:,2] = np.char.strip(data_np[:,2], chars='$')
    
    featDict_in = "word2vec.txt"
    feat_dict = load_feature_dictionary(featDict_in)

    trim_data = trim(data_np[:, 0], feat_dict)


    # Name of artist
    map = mapper(data_np[0])
    for i in range(len(data_np)):
        # data_np[i, 0] = map[data_np[i, 0]]
        # data_np[i, 0] = trim_data[i]
        pass

    # Description of art
    new_array = np.zeros((len(data_np), 300 + 2))
    new_array[:,0:300] = trim_data
    new_array[:,300:] = data_np[:,1:]


    dataset = MyDataset(new_array)
    dataloader = DataLoader(dataset=dataset, batch_size=4, shuffle=True, num_workers=2)

    num_epochs = 2
    for epoch in range(num_epochs):
        for batch_idx, (data, targets) in enumerate(dataloader):
            print(data, targets)