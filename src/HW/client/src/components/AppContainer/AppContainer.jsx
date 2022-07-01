import { useEffect,useState } from "react";
import "./AppContainer.css"
import {fetchItems} from "../../Services/ItemClient"

function AppContainer() {
const [items, setItems] = useState([]);


   
    useEffect(() => {
        fetchItems().then(fetchedItems => {
            setItems(fetchedItems);
        });
        
    }, []);
    
  return <div className="app-container">hello world app container
    
  </div>;
}

export default AppContainer;
