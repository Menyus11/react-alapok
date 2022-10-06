import { useEffect, useState } from 'react';
import React from 'react';

//////// Postok listázása  ////////////////////////////////////////////////////////////

function ListItem(props) {
    const [visible, setVisible] = useState(false);

    return <React.Fragment>
        <div className='bg-warning rounded p-3 maindiv' onClick={() => { setVisible(true) }}>
            <p>{props.idNow}</p>
            <h3>{props.commentsItem.title}</h3>
            <p>{props.commentsItem.body}</p>
            {props.comments[0].filter(userItems => userItems.id === props.commentsItem.userId)

                .map((userItems, userIndex) => {

                    return <React.Fragment key={userIndex}>
                        <b className='postAuthor'>{userItems.name}</b>
                        <small>, posztjai száma: <b>{props.postAll.filter(post => post.userId === userItems.id).length}</b></small>

                        {visible && (

                            <div className='mt-3'>
                                <ul style={{listStyleType: "none", textAlign: "start"}}>
                                    <li>username: {userItems.username}</li>
                                    <li>email: {userItems.email}</li>
                                    <li>phone: {userItems.phone}</li>
                                    <li>website: {userItems.website}</li>
                                    <li>company: {userItems.company.name}, motto: {userItems.company.catchPhrase}</li>
                                    <li>address: {userItems.address.zipcode} {userItems.address.city} {userItems.address.street} {userItems.address.suite}</li>
                                </ul>

                                <b>comments:</b>
                                <ul style={{listStyleType: "none", textAlign: "start"}}>{props.comments[2].filter(postItem => props.idNow === postItem.postId)
                                    .map((postItem, postIndex) => {

                                        return <React.Fragment key={postIndex}>
                                            <li>{postItem.body}</li>
                                        </React.Fragment>

                                    })}</ul>

                                <button className='btn btn-danger form-control'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setVisible(false);
                                    }}>
                                    Összecsukás</button>
                            </div>
                        )}

                    </React.Fragment>
                })}
        </div>
        <hr />
    </React.Fragment>
}

export function ListingPosts() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/comments'),
        ]).then(async res => {

            const a = await res[0].json()
            const b = await res[1].json()
            const c = await res[2].json()

            return [a, b, c]

        }).then(res => {
            setComments(res);
        })
    }, [])

    if (comments.length > 0) {
        return (
            <div className='container bg-success p-5 rounded'>
                {
                    comments[1].map((commentsItem, commentIndex) => {

                        return (
                            <React.Fragment key={commentIndex}>
                                <ListItem postAll={comments[1]} comments={comments} idNow={commentsItem.id} commentsItem={commentsItem} />
                            </React.Fragment>)
                    })
                }
            </div>
        );
    }
}


// Számológép //////////////////////////////////////////////////////////////////////

const Buttons = (props) => {

    const [isActive, setActive] = useState(true);

    const buttonsHandler = props.getDisplayData === 0 ?

        (event) => { props.setDisplayData(event.target.value); setActive(true) } :
        function (event) { props.setDisplayData(props.getDisplayData + event.target.value); setActive(true) };

    const operatorHandler = function (event) { props.setDisplayData(props.getDisplayData + event.target.value); setActive(false) };


    const NumberButton = (props) => {
        return (
            <button value={props.value} className='col bg-info calcbutton m-2 py-4 rounded' onClick={buttonsHandler}>{props.value}</button>
        )
    }

    const OperationButton = (props) => {  
        return (
            <button value={props.value} className='col bg-warning calcbutton m-2 py-4 rounded operation' onClick={operatorHandler}>{props.value}</button>
        )
    }

    const EqualButton = () => {
        return (
            /* eslint-disable-next-line */
            <button value="=" className='col-10 bg-success calcbutton m-2 py-4 rounded' onClick={() => { props.setDisplayData(eval(props.getDisplayData)) }}>=</button>
        )
    }

    const ResetButton = () => {
        return (
            <button className='col bg-danger calcbutton m-2 py-4 rounded' onClick={() => { props.setDisplayData(0); setActive(true) }}>C</button>
        )
    }

    const buttonsArray = [
        <NumberButton value="7" />,
        <NumberButton value="8" />,
        <NumberButton value="9" />,
        <OperationButton value={isActive ? "+" : ""} />,
        <NumberButton value="4" />,
        <NumberButton value="5" />,
        <NumberButton value="6" />,
        <OperationButton value={isActive ? "-" : ""} />,
        <NumberButton value="1" />,
        <NumberButton value="2" />,
        <NumberButton value="3" />,
        <OperationButton value={isActive ? "*" : ""} />,
        <ResetButton />,
        <NumberButton value="0" />,
        <OperationButton value={isActive ? "." : ""} />,
        <OperationButton value={isActive ? "/" : ""} />,
        <EqualButton />
    ];

    return (
        <div className='p-3' >

            <div className='row row-cols-5 justify-content-center'>

                {buttonsArray.map((buttonElement, id) => {
                    return (
                        <React.Fragment key={id}>
                            {buttonElement}
                        </React.Fragment>
                    )
                })}

            </div>

        </div>
    )
}

const Display = (props) => {
    return (
        <textarea className='bg-dark border rounded display form-control text-light text-wrap fs-2' value={props.getDisplayData} readOnly></textarea>
    )
}

export function Calculator() {
    const [displayData, setDisplayData] = useState(0);

    return (<React.Fragment>
  
      <div className='row p-5'>
        <div className='col-3'></div>
        <div id='calc_container' className='col text-center p-4 border bg-primary rounded position-absolute top-50 start-50 translate-middle'>
          <Display getDisplayData={displayData}></Display>
          <Buttons setDisplayData={setDisplayData} getDisplayData={displayData}></Buttons>
        </div>
        <div className='col-3'></div>
      </div>
  
    </React.Fragment>
    );
  }

  //// 