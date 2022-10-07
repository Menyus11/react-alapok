import { useEffect, useState } from 'react';
import React from 'react';
import { photos } from "./photos";
import { youtubeLink } from './videos';

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
                                <ul style={{ listStyleType: "none", textAlign: "start" }}>
                                    <li>username: {userItems.username}</li>
                                    <li>email: {userItems.email}</li>
                                    <li>phone: {userItems.phone}</li>
                                    <li>website: {userItems.website}</li>
                                    <li>company: {userItems.company.name}, motto: {userItems.company.catchPhrase}</li>
                                    <li>address: {userItems.address.zipcode} {userItems.address.city} {userItems.address.street} {userItems.address.suite}</li>
                                </ul>

                                <b>comments:</b>
                                <ul style={{ listStyleType: "none", textAlign: "start" }}>{props.comments[2].filter(postItem => props.idNow === postItem.postId)
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
            <div id='calc_container' style={{ marginTop: "3%" }} className='col text-center p-4 border bg-primary rounded position-absolute top-50 start-50 translate-middle'>
                <Display getDisplayData={displayData}></Display>
                <Buttons setDisplayData={setDisplayData} getDisplayData={displayData}></Buttons>
            </div>
            <div className='col-3'></div>
        </div>

    </React.Fragment>
    );
}

//// Home  //////////////////////////////////////

export const HomePage = () => {

    const SampleVideo = () => {

        let videoIndex = "";
        youtubeLink.forEach((e, i) => {
            videoIndex = i;
        })

        const min = 0;
        const max = videoIndex;
        const randomVideoIndex = Math.round(min + Math.random() * (max - min));
        let randomVideo = "";

        youtubeLink.forEach((e, i) => {
            if (i === randomVideoIndex) { randomVideo = e.src }
        })

        return (
            <div className="m-3 d-flex justify-content-around">
                <iframe width="450" height="250" src={randomVideo} title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowfullscreen"></iframe>
            </div>
        )
    }


    const SamplePicture = () => {
        let photoIndex = "";

        photos.forEach((e, i) => {
            photoIndex = i;
        })

        const min = 0;
        const max = photoIndex;
        const randomPhotoIndex = Math.round(min + Math.random() * (max - min));
        let randomPhoto = "";

        photos.forEach((e, i) => {
            if (i === randomPhotoIndex) { randomPhoto = e.src }
        })

        return (
            <div className="m-3 d-flex justify-content-around">
                <a href={randomPhoto}><img src={randomPhoto} alt={randomPhotoIndex} style={{ height: '300px' }} /></a>
            </div>
        )
    }

    return (
        <div className="bg-warning">
            <h2>Böngésszen kedvére válogatott tartalmakból!</h2>
            <hr />
            <h3 className="px-3">Videók:</h3>
            <div className="row">
                <div className='col'><SampleVideo /></div>
                <div className='col'><SampleVideo /></div>
                <div className='col'><SampleVideo /></div>
            </div>
            <hr />
            <h3 className="px-3">Képek:</h3>
            <div className="row text-center">
                <div className='col'><SamplePicture /></div>
                <div className='col'><SamplePicture /></div>
                <div className='col'><SamplePicture /></div>
                <div className='col'><SamplePicture /></div>
            </div>
        </div>
    )
};


/////////// Picture //////////////////////


export const PicturesPage = () => {

    return (
        <div className="bg-warning">
            <h1 className="text-center">Kedvenc fotóim</h1>
            <div className="m-3 row d-flex justify-content-around">


                {photos.map((element, index) => {
                    return <React.Fragment key={index}>
                        <div className='m-2 col'><a href={element.src}><img src={element.src} alt="fotó" style={{ maxWidth: '400px', maxHeight: "250px" }} /></a></div>
                    </React.Fragment>
                })}

            </div>
        </div>
    )
}


////// Videók  //////////////////////////////


export const VideoPage = () => {

    return (
        <div className="bg-warning text-center">
            <h1 className="text-center">Kedvenc videóim</h1>

            <div className="row d-flex justify-content-around">
                {youtubeLink.map((element, index) => {
                    return <React.Fragment key={index}>
                        <div className="col m-3"><iframe width="450" height="250" src={element.src} title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowfullscreen"></iframe></div>
                    </React.Fragment>
                })}
            </div>

        </div>
    )
}

////////// Login  ///////////////////////////////


export const AccountPage = () => {

    const [loginData, setLoginData] = useState({ loginName: "", loginPassword: "" });
    const [regData, setRegData] = useState({ regName: "", regPassword: "" });

    return (

        <div className="row m-3 bg-warning">

            <h1 className="text-center">Lépjen be, vagy regisztráljon!</h1>

            <div className="text-center col m-5">
                <div className="card" style={{ minWidth: "248px" }}>
                    <div className="card-header">
                        Belépés
                    </div>
                    <div className="card-body">

                        <h3 className="card-title">Itt tud belépni!</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            fetch('http://localhost/feldolgozo.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(loginData)
                            })
                        }}>
                            <label htmlFor="login_email">Az Ön email címe</label><br />
                            <input id='login_email' className="form-control" onChange={(event) => setLoginData({ ...loginData, loginName: event.target.value })} /><br />

                            <label htmlFor="login_password">Az Ön jelszava</label><br />
                            <input id='login_password' className="form-control" onChange={(event) => setLoginData({ ...loginData, loginPassword: event.target.value })} /><br />

                            <button className="btn btn-success m-1" type="submit">Belépés</button>
                            <button className="btn btn-danger m-1" type="button">Mégsem</button>
                        </form>

                    </div>
                </div>
            </div>

            <div className="text-center col m-5">
                <div className="card" style={{ minWidth: "248px" }}>
                    <div className="card-header">
                        Regisztráció
                    </div>
                    <div className="card-body">

                        <h3 className="card-title">Itt tud regisztrálni!</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            fetch('http://localhost/feldolgozo.php', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(regData)
                            })
                        }}>
                            <label htmlFor="registration_email">Az Ön email címe</label><br />
                            <input id='registration_email' className="form-control" onChange={(event) => setRegData({ ...regData, regName: event.target.value })} /><br />

                            <label htmlFor="registration_password">Az Ön jelszava</label><br />
                            <input id='registration_password' className="form-control" onChange={(event) => setRegData({ ...regData, regPassword: event.target.value })} /><br />

                            <button className="btn btn-success m-1" type="submit">Regisztráció</button>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}