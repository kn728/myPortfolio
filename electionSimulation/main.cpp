/*
csci251 A3
Keegan Naidoo
6424624
*/
#include <iostream>
#include <vector>
#include <random>
#include <stdlib.h>
using namespace std;


class Monitor {
private:
	int digit; //number of websites for one user
	int user; //number of users
public:
	Monitor(int d, int u) : digit(d), user(u) {};
	int getDigit();
	int getUser();
};
//generate random number between the called min and max, used in a number of functions
int generateNumber(int min, int max) {
	int x = 0;
	if (max < min) {
		int temp = max;
		max = min;
		min = temp;
	}
	else if (max == min) {
		cerr << "range of 0 is not execepted please try again.";
		exit(0);
	}
	else {
		static default_random_engine rand(time(0));
		static uniform_int_distribution<int> range(min, max); //setting the range of random number
		x = range(rand);
		return x;
	}
}
//generate the random integers for url representation
int Urlgeneration() {
	return generateNumber(0, 9);
}

//User container class
template <typename T>
class user {
private:
	T var;
	vector<T> User; //browsing history for each User
public:
	//fills User vector with a random digit representing the URL
	void fillUserHistory(int mon)
	{
		for (int i = 0; i < mon; i++) {
			User.push_back(Urlgeneration());
		}
	};
	user(T digits) {
		fillUserHistory(digits);
	};
	virtual ~user() { User.clear();};
	void variety()
	{
		int checker = 0;
		int tempo;
		vector<int> temp;
		//filling a temporary vector with users to work on without effecting the original
		for (int i = 0; i < User.size(); i++) {
			temp.push_back(User[i]);
		}
		//reorders the temprary array using bubble sort
		for (int i = 0; i < temp.size(); i++) {
			for (int x = i + 1; x < temp.size(); x++) {
				if (temp[x] < temp[i]) {
					tempo = temp[i];
					temp[i] = temp[x];
					temp[x] = tempo;
				}
			}
		}
		//eliminates the duplicates of any digits
		temp.erase(unique(begin(temp), end(temp), equal_to<>()), end(temp));
		var = temp.size();//shows the amount of different digits as only distinct digits are left in the temporary
	}
	vector<T> getUser(){ return User;}	
	T getVar() { return var; };
	void setUser(int i) { User.push_back(i); };
	//works out the difference between this User and a different one
	int difference(user comp) 
	{
		int counter = 0;
		for (int i = 0; i < User.size(); i++) {
			if (User[i] != comp.getUser()[i]) {
				counter++;
			}
		}
		return counter;
	};
};

int Monitor::getDigit() {
	return digit;
}

int Monitor::getUser() {
	return user;
}
//pool container class
template <typename T, typename T2>
class Pool {
private:
	vector<T> store; //to store the users
	T2 browsHistory; //to store the browsinghistory size for each user
	T2 size; //store the size of the Store vector
public: 
	Pool(T2 s, T2 browsingLimit) {
		//error checking
		if (browsingLimit > 30) {
			cerr << "Error: there is no need to view a browsing history of 30, " <<
				"a view beyond this size becomes very hard to read. \n";
			exit(0);
		}
		else if (s > 100) {
			cerr << "Error: There is no need to view more than 100 users, it will become " <<
				"very difficiult to read. ";
			exit(0);
		}
		else {
			size = s;
			browsHistory = browsingLimit;
			for (int i = 0; i < s; i++) {
				store.push_back(user<int>(browsingLimit));
				store[i].variety();
			}
		}
	}

	virtual ~Pool() { store.clear(); };
	vector<T> getStore(){ return store; };
	//displays the user information and browsing history
	void display() {
		for (int i = 0; i < store.size(); i++) {
			cout << "User " << i + 1 << ": ";
			for (int x = 0; x < browsHistory; x++) {
				cout << store[i].getUser()[x] << "  ";
			}
			cout << "Variance: " << store[i].getVar() << endl;
		}
	}
	//finds the lowest variety
	int minimumVariety() {
		int current;
		vector<int> temp;
		//fills the temp array with all the varietys
		for (int i = 0; i < size; i++) {
			temp.push_back(store[i].getVar());
		}
		current = temp[0];
		//works out the lowest varyiety
		for (int x = 1; x < temp.size(); x++) {
			if (temp[x] < current) {
				current = temp[x];
			}
		}
		return current;
	}

	int minimumDifference() {
		//compares each of the users to find the lowest differences
		vector<int> differences;
		for (int i = 0; i < size; i++) {
			for (int x = 0; x < size; x++) {
				if (i == x) { //makes sures the Users cant be compared with themselves
					continue;
				}
				else {
					int temp = store[i].difference(store[x]);//stores all the differences
					differences.push_back(temp);
				}
			}
		}
		int lowest = differences[0];
		//finds the lowest difference
		for (int i = 1; i < differences.size(); i++) {
			if (differences[i] < lowest) {
				lowest = differences[i];
			}
		}
		return lowest;
	}

};


int main() {
	Monitor mon(5, 5); //monitor object changing the numbers will change the amount of users checks, as well as the amount websites each user used
	Pool<user<int>,int> p(mon.getUser(), mon.getDigit());
	
	p.display();
	
	cout << endl <<"The lowest variety within the sets is " << p.minimumVariety() <<endl;
	
	cout << "the minimum difference between the sets is " << p.minimumDifference() <<endl;
	return 1;
}

