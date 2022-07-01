// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

  const url = "http://localhost:8080"

  export  async function createItem(item) {
    try {
      const response = await fetch(`${url}/item`, {
        method: "post",
        body: JSON.stringify({ item }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status == 201) {
        return await response.json();
      }
    } catch (err) {
      throw new Error("faild to create item");
    }
  }

  export  async function  fetchItems() {
    try {
      const response = await fetch(`${url}/item`)
       

      if (response.status != 200) {
        throw new Error(" Error fetching items");
      }

      const data = await response.json();
      console.log(data)

      return data;
    } catch (err) {
      throw new Error("failed to fetch items");
    }
  }

  export async function  deleteItem(itemId) {
    try {
      await fetch(`${url}/item/${itemId}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      throw new Error("failed to delete item");
    }
  }

  export async function  deleteAllItems() {
    try {
      await fetch("/item", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      throw new Error("failed to delete all items ");
    }
  }
  export async function updateStatus(itemId,newStatus) {
    try {
      const response = await fetch(`/item/${itemId}`, {
        method: "put",
        body: JSON.stringify({ status:newStatus }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status == 200) {
        return await response.json();
      }
    } catch (err) {
    console.log(err)
    }
  }

