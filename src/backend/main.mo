import Map "mo:core/Map";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  type Product = {
    id : Nat;
    name : Text;
    category : Text;
    price : Float;
    description : Text;
    rating : Float;
    reviewCount : Nat;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  let products = Map.fromIter<Nat, Product>(
    [
      // T-shirts
      (
        1,
        {
          id = 1;
          name = "Classic White Tee";
          category = "T-Shirts";
          price = 19.99;
          description = "100% cotton, regular fit white t-shirt.";
          rating = 4.5;
          reviewCount = 120;
        },
      ),
      (
        2,
        {
          id = 2;
          name = "Graphic Black Tee";
          category = "T-Shirts";
          price = 22.99;
          description = "Black t-shirt with modern graphic print.";
          rating = 4.3;
          reviewCount = 85;
        },
      ),
      (
        3,
        {
          id = 3;
          name = "V-Neck Navy Tee";
          category = "T-Shirts";
          price = 18.99;
          description = "Navy blue v-neck for a casual look.";
          rating = 4.0;
          reviewCount = 60;
        },
      ),
      (
        4,
        {
          id = 4;
          name = "Performance Tee";
          category = "T-Shirts";
          price = 25.99;
          description = "Moisture-wicking fabric for active wear.";
          rating = 4.7;
          reviewCount = 150;
        },
      ),
      (
        5,
        {
          id = 5;
          name = "Striped Tee";
          category = "T-Shirts";
          price = 20.99;
          description = "White t-shirt with blue stripes.";
          rating = 4.2;
          reviewCount = 55;
        },
      ),
      // Jeans
      (
        6,
        {
          id = 6;
          name = "Slim Fit Jeans";
          category = "Jeans";
          price = 49.99;
          description = "Dark wash, slim fit denim jeans.";
          rating = 4.6;
          reviewCount = 200;
        },
      ),
      (
        7,
        {
          id = 7;
          name = "Regular Fit Jeans";
          category = "Jeans";
          price = 44.99;
          description = "Classic denim, regular fit for comfort.";
          rating = 4.4;
          reviewCount = 170;
        },
      ),
      (
        8,
        {
          id = 8;
          name = "Distressed Jeans";
          category = "Jeans";
          price = 54.99;
          description = "Fashionable distressed look.";
          rating = 4.1;
          reviewCount = 90;
        },
      ),
      (
        9,
        {
          id = 9;
          name = "Black Jeans";
          category = "Jeans";
          price = 47.99;
          description = "Versatile black denim jeans.";
          rating = 4.3;
          reviewCount = 130;
        },
      ),
      (
        10,
        {
          id = 10;
          name = "Stretch Jeans";
          category = "Jeans";
          price = 52.99;
          description = "Comfortable jeans with stretch fabric.";
          rating = 4.5;
          reviewCount = 110;
        },
      ),
      // Gadgets
      (
        11,
        {
          id = 11;
          name = "Bluetooth Earbuds";
          category = "Gadgets";
          price = 59.99;
          description = "Wireless earbuds with long battery life.";
          rating = 4.8;
          reviewCount = 300;
        },
      ),
      (
        12,
        {
          id = 12;
          name = "Smartwatch";
          category = "Gadgets";
          price = 129.99;
          description = "Fitness tracking and notifications.";
          rating = 4.6;
          reviewCount = 250;
        },
      ),
      (
        13,
        {
          id = 13;
          name = "Portable Charger";
          category = "Gadgets";
          price = 24.99;
          description = "High capacity power bank.";
          rating = 4.7;
          reviewCount = 180;
        },
      ),
      (
        14,
        {
          id = 14;
          name = "Wireless Speaker";
          category = "Gadgets";
          price = 39.99;
          description = "Compact speaker with rich sound.";
          rating = 4.4;
          reviewCount = 210;
        },
      ),
      (
        15,
        {
          id = 15;
          name = "Smart Key Finder";
          category = "Gadgets";
          price = 16.99;
          description = "Track your keys with your phone.";
          rating = 4.2;
          reviewCount = 95;
        },
      ),
    ].values(),
  );

  public query func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    let filtered = products.values().filter(
      func(p) {
        p.category == category;
      }
    );
    filtered.toArray().sort();
  };

  public query func getProductById(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };
};
