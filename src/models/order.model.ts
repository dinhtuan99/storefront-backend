// @ts-ignore
import Client from "../database";

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type Order_Products = {
  quantity: number, 
  order_id: number, 
  product_id: number
};

export class OrderStore {
  async getOrders(): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql);

      conn.release();
      
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order. Error: ${err}`);
    }
  }

  async getOrdersByUserId(user_id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order ${user_id}. Error: ${err}`);
    }
  }

  async getCurrentOrdersByUserId(user_id: number): Promise<Order> {
    try {
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC LIMIT 1";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [user_id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order ${user_id}. Error: ${err}`);
    }
  }

  async getCompleteOrdersByUserId(user_id: number): Promise<Order[]> {
    try {
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND status='complete'";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order ${user_id}. Error: ${err}`);
    }
  }

  async createOrder(order: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [order.user_id, order.status]);

      const productData = result.rows[0];

      conn.release();

      return productData;
    } catch (err) {
      throw new Error(`Could not add order. Error: ${err}`);
    }
  }

  async deleteOrder(orderId: number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [orderId]);

      const orderData = result.rows[0];

      conn.release();

      return orderData;
    } catch (err) {
      throw new Error(`Could not delete order. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order_Products> {
    // get order to see if it is open
    try {
      const ordersql = "SELECT * FROM orders WHERE id=($1)";
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(ordersql, [orderId]);

      const order = result.rows[0];

      if (order.status !== "active") {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        "INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
