import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
    const [sweet, setSweet] = useState("");
    const [sweets, setSweets] = useState([]);
    useEffect(() => {  
        dbService.collection("sweets").onSnapshot(snapshot => {
            const sweetArray = snapshot.docs.map(doc => ({id:doc.id, ...doc.data()
            }));
            setSweets(sweetArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("sweets").add({
            text: sweet,
            createdAt: Date.now(),
            creatorId: userObj.uid, 
        })
        setSweet("");
    };
    const onChange = (event) => {
        const { target:{value}
        } = event;
        setSweet(value);
    }
    return ( 
    <div>
        <form onSubmit={onSubmit}>
            <input value={sweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="Sweet" />
        </form>
        <div>
            {sweets.map(sweet => (
            <div key={sweet.id}>
                <h4>{sweet.text}</h4>
            </div>
            ))}
        </div>
    </div>
    )
}
export default Home;