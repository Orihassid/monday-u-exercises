// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
class ItemClinet {
  constructor() {}

  async createItem(item) {
    try{
    const response = await fetch("/item", {
      method: "post",
      body: JSON.stringify({ item }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status == 201) {
      return await response.json();
    }
  }
  catch(err)
  {
    throw new Error('faild to create item')
  }
  }

  async fetchItems() {
    try{
    const response = await fetch("/item", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.status != 200) {
      throw new Error(" Error fetching items");
    }

    const data = await response.json();

    return data;
    }
    catch(err)
    {
      throw new Error ('failed to fetch items')
    }
  }

  async בdeleteItem(itemId) {
    try {
       await fetch(`/item/${itemId}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      throw new Error("failed to delete item");
    }
  }

async deleteAllItems()
{
    try {
        await fetch('/item' ,{
         method: "delete",
         headers: { "Content-Type": "application/json" },
       });
     } catch (err) {
       throw new Error("failed to delete all items ");
     }
   }

}
export default new ItemClinet();
