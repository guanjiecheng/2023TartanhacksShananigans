import torch
import torch.nn as nn
import torch.nn.functional as F

class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        # 1 input image channel, 6 output channels, 5x5 square convolution
        # kernel
        self.conv1 = nn.Conv2d(1, 6, 5)
        self.conv2 = nn.Conv2d(6, 16, 5)
        # an affine operation: y = Wx + b
        self.fc1 = nn.Linear(16 * 5 * 5, 120)  # 5*5 from image dimension
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        # Max pooling over a (2, 2) window
        x = F.max_pool2d(F.relu(self.conv1(x)), (2, 2))
        # If the size is a square, you can specify with a single number
        x = F.max_pool2d(F.relu(self.conv2(x)), 2)
        x = torch.flatten(x, 1) # flatten all dimensions except the batch dimension
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x


net = Net()
# params = list(net.parameters())
# print(len(params))

# # Look at the parameters we can tune
# for param in params:
#     print(param.size())

# # Random inputs for now
# input = torch.randn(1, 1, 32, 32)

# # output of the layer
# out = net(input)
# print("old out", out)

# # Zero gradient buffers of all parameters and backprops with random gradients
# net.zero_grad()
# out.backward(torch.randn(1, 10))

# out2 = net(input)
# print("new out", out2)


# Loss Function
output = net(input)
target = torch.randn(10)  # a dummy target, for example
target = target.view(1, -1)  # make it the same shape as output
criterion = nn.MSELoss()

loss = criterion(output, target)
print(loss)





















'''
    Artist name - one hot encoding
    price sold - labels
    year sold - normalize from min. to curr year, (e.g 2000 to 2022 normalized to 0 to 1)
    year created - normalize from min. to curr year, (e.g 1800 to 2022 normalized to 0 to 1)
    medium of work - one hot
    area size of 2d canvas - normalized from 0 to 1


    features:
    one hot vector as sparse representation: (represent the vector index where it is one hot)
        artists name
        medium of work

    float values that are min-max normalized: (scaled between 0 and 1) <- alternatively can use z-score normalization?
        year sold
        year created
        area size of 2d canvas

    
    label: price sold
    optimization function: MSELoss

    try:
        2 hidden LINEAR layers, 50 hidden units each? (same as tutorial)

    good reference (for regression):
    https://www.analyticsvidhya.com/blog/2021/08/a-walk-through-of-regression-analysis-using-artificial-neural-networks-in-tensorflow/

    feature engineering word vectors
    https://developers.google.com/machine-learning/crash-course/representation/feature-engineering
    https://developers.google.com/machine-learning/glossary#sparse_representation


    data set used from this repo
    https://github.com/ali-ce/datasets/blob/master/Most-Expensive-Things/Paintings.csv
'''