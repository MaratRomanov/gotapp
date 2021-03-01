import React, { useState, useEffect } from 'react';
import './itemDetails.css';
import Spinner from '../spinner';

const Field = ({ item, field, label }) => {
    return (
        <div className="char-details-inform-line">
            <span className="char-details-inform-span">{label}</span>
            <span>{item[field]}</span>
        </div>
    )
}

export { Field };

function ItemDetails({ getData, itemId, children }) {

    const [item, setItem] = useState(null);
    const [needUpdate, setNeedUpdate] = useState(false);

    useEffect(() => {
        updateDetails();
    }, [itemId]);

    function updateDetails() {
        if (!itemId) {
            return;
        }

        setNeedUpdate(true);

        getData(itemId)
            .then((input) => {
                return (
                    setItem(input),
                    setNeedUpdate(false)
                )
            });
    }

    if (needUpdate) {
        return <Spinner />
    }

    if (!item) {
        return <span className="select-error">Выберите значение из списка</span>
    }

    const { name } = item;

    return (
        <div className="char-details">
            <h4>{name}</h4>
            <div className="char-details-inform">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, { item })
                    })
                }
            </div>
        </div>
    );

}

export default ItemDetails;