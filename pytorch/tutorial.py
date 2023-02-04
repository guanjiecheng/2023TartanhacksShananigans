#imports
import torch
import torch.nn as nn
import torch.nn.functional as F # functions, activations
import torch.optim as optim
from torch.utils.data import DataLoader # easy dataset manager, create mini batches
import torchvision.datasets as datasets # import pytroch standard datasets
import torchvision.transforms as transforms # perform transformations on dataset
import matplotlib.pyplot as plt

#fully connected network#
class Net(nn.Module):
    def __init__(self, input_size, num_classes): #(28x28 = 784 nodes)
        super(Net, self).__init__()

        # here, we define all the activation functions
        self.fc1 = nn.Linear(input_size, 50) # input layer, 50 hidden layers
        
        self.fc2 = nn.Linear(50, num_classes) #50 hidden layers -> output layer
    
    def forward(self, x):   # forward runs on input x

        # Define the forward computation
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = Net(784, 10)
x = torch.randn(64, 784) # e.g mini batch, 64 examples of each 784 
# print(model(x).shape) # will return (64, 10) since 64 examples, give us classification

#set device
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

#hyperparameters#
input_size = 784
num_classes = 10
learning_rate = 0.001
batch_size = 64
num_epochs = 20

#load data#
#download dataset
train_dataset = datasets.MNIST(root='dataset/', train=True, transform=transforms.ToTensor(), download=True)

# load our training set, make sure to shuffle every epoch
train_loader = DataLoader(dataset=train_dataset, batch_size=batch_size, shuffle=True)

# TESTING
test_dataset = datasets.MNIST(root='dataset/', train=False, transform=transforms.ToTensor(), download=True)
test_loader = DataLoader(dataset=test_dataset, batch_size=batch_size, shuffle=True)



#initialize network
model = Net(input_size=input_size, num_classes=num_classes).to(device)


#loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

losses = []

# train network
for epoch in range(num_epochs):
    print("new epoch")
    for batch_idx, (data, targets) in enumerate(train_loader):
        data = data.to(device=device)
        targets = targets.to(device=device)

        # unroll matrix into long vector
        data = data.reshape(data.shape[0], -1)

        # forward computation
        scores = model(data)
        loss = criterion(scores, targets)
        # print(loss.item())
        # backward prop
        optimizer.zero_grad() # set gradient to zero for each batch, clear it before every batch's forward props
        loss.backward()

        # gradient descent / adam step
        optimizer.step()
    losses.append(loss.item())


#check accuracy on training and test
def check_accuracy(loader, model):
    if loader.dataset.train:
        print("Checking accuracy on training data")
    else:
        print("Checking accuracy on test data")

    num_correct = 0
    num_samples = 0
    model.eval()    # let it know its evaluation mode

    with torch.no_grad():   # no need to compute gradients in calculations
        for x, y in loader:
            x = x.to(device=device) # just for cuda stuff
            y = y.to(device=device)
            x = x.reshape(x.shape[0], -1)   # reshape into 1d vector

            scores = model(x)   # obtain our label predictions
            _, predictions = scores.max(1) # return type (value, index), we just want index
            num_correct += (predictions == y).sum()
            num_samples += predictions.size(0)
        
        print(f'Got {num_correct} / {num_samples} with accuracy {float(num_correct)/float(num_samples)*100:.2f}')




    model.train()


check_accuracy(train_loader, model)
check_accuracy(test_loader, model)

print(losses)
x = [i for i in range(len(losses))]
plt.title("Loss")
plt.xlabel("Epoch")
plt.xlabel("Loss (CrossEntropyLoss)")
plt.plot(x, losses, color="red")
plt.show()