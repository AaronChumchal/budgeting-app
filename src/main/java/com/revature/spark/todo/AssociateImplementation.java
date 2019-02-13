package com.revature.spark.todo;

import java.util.List;
import java.util.Map;

import com.revature.spark.beans.Expense;
import com.revature.spark.beans.User;

/**
 * Within this class, you will implement the logic to calculate data for various
 * reports.
 * 
 * @author Aaron Chumchal
 * 
 */
public class AssociateImplementation {

	/**
	 * Find the sum of all expenses.
	 * 
	 * @param calls
	 * @return
	 */
	public Double sum(List<Expense> expenses) {
		double sum=0;
		for(int i=0;i<expenses.size();i++) {
			sum+=expenses.get(i).getCost();
		}
		
		
		return sum;
	}

	/**
	 * Find the lowest expense cost.
	 * 
	 * @param calls
	 * @return
	 */
	public Double min(List<Expense> expenses) {
		double LowestVal=100000;
		for(int i=0;i<expenses.size();i++) {
			
			LowestVal=Math.min(LowestVal, expenses.get(i).getCost() );
			}
		
		return LowestVal;
	}

	/**
	 * Find the highest expense cost.
	 * 
	 * @param calls
	 * @return
	 */
	public Double max(List<Expense> expenses) {
		double HighestVal=0;
		for(int i=0;i<expenses.size();i++) {
			
			HighestVal=Math.max(HighestVal, expenses.get(i).getCost() );
			}
		
		
		return HighestVal;
	}

	/**
	 * Find the average expense cost.
	 * 
	 * @param calls
	 * @return
	 */
	public Double avg(List<Expense> expenses) {
		
			double average;
			double total=0;
			for(int i=0;i<expenses.size();i++) {
				total+=expenses.get(i).getCost();
			}
			average=total/expenses.size();
			
		return average;
	}

	/**
	 * Find the median expense cost.
	 * 
	 * @param calls
	 * @return
	 */
	public Double median(List<Expense> expenses) {
		Double med=0.0;
		int x=expenses.size();
		Double ExpArray[]=new Double[x];
		for(int i=0;i<expenses.size();i++) {
			ExpArray[i]=expenses.get(i).getCost();
		}
		order(ExpArray);
		
		if (x%2==0) {
			med=(ExpArray[(x/2)]+ExpArray[(x/2)-1])/2;
		}else {
			med=ExpArray[(x/2)];
		}
		
		
		
		return med;
	}
	
	public Double[] order(Double[] numArray){
		   boolean change;
		   int size=numArray.length-1;
		  Double[] x=numArray;
		  do {
		      change=false;
		   for(int i=0;i<size;i++){
		if (x[i]>x[i+1])
		{
		    double temp=x[i];
		    x[i]=x[i+1];
		    x[i+1]=temp;
		    change=true;
		}

		   }
		   size--;
		  }while (change);
		 return x;
		 }
	

	/**
	 * !! BONUS CHALLENGE REQUIREMENT !!
	 * 
	 * Find the highest expense category for each user.
	 * 
	 * @param calls
	 * @return
	 */
	public Map<User, String> highestExpenseCategoryPerUser(List<Expense> expenses) {
		return null;
	}

}
