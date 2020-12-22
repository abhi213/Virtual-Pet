class Food {
    constructor(){
        var options = {

        }
        this.milk = loadImage("images/Milk.png");
        var lastFed, foodStock, frameFeed = 0;
    }

    getFoodStock(){
       return this.foodStock;
    } 
    updateFoodStock(count){
       this.foodStock = count;  
    }
    deductFood(){
        this.foodStock--;
        this.frameFeed = 20;
    }
    bedroom(){
        background(bedroom, 550, 550); 
     }
     garden(){
         background(garden, 550, 550); 
     }
     washroom(){
         background(washroom, 550, 550); 
     }
 
    display(){
        var x=80, y=100;

        if (this.frameFeed-- > 0) {
            image(this.milk, 360, 320, 70, 70);
        }

        if(this.foodStock != 0) {
           for (var i=0;i<this.foodStock;i++) {
               if (i%10 == 0) {
                   x= 80;
                   y=y+50;
               }
               image(this.milk, x, y, 50, 50);
               x=x+30;
           }
        }
    }
}