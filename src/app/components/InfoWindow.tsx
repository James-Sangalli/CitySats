import { Contact, Review } from './profile';
import styles from '../page.module.css';
import { getStarRatingInfo } from '../lib/helpers';

export default function InfoWindow(props: {
    username: string;
    contact: Contact;
    reviews: Review[];
    bio: string;
    position: { lat: number; lng: number };
    onClose: Function;
}) {
    const ratingInfo = getStarRatingInfo(props.reviews);
    console.log(ratingInfo);
    return (
        <div
            // @ts-ignore
            position={props.position}
            onClose={props.onClose}
            id={styles.infoWindow}
        >
            <p>{props.username}</p>
            <p>{JSON.stringify(props.contact)}</p>
            <p>{props.bio}</p>
            <div className={styles.rate}>
                <input
                    type="radio"
                    id="star5"
                    name="rate"
                    value="5"
                    onClick={(event) => {
                        return onClickReview(5, event);
                    }}
                    defaultChecked={ratingInfo.average == 5}
                />
                <label htmlFor="star5" title="text">
                    5 stars
                </label>
                <input
                    type="radio"
                    id="star4"
                    name="rate"
                    value="4"
                    onClick={(event) => {
                        return onClickReview(4, event);
                    }}
                    defaultChecked={
                        ratingInfo.average >= 4 && ratingInfo.average < 5
                    }
                />
                <label htmlFor="star4" title="text">
                    4 stars
                </label>
                <input
                    type="radio"
                    id="star3"
                    name="rate"
                    value="3"
                    onClick={(event) => {
                        return onClickReview(3, event);
                    }}
                    defaultChecked={
                        ratingInfo.average >= 3 && ratingInfo.average < 4
                    }
                />
                <label htmlFor="star3" title="text">
                    3 stars
                </label>
                <input
                    type="radio"
                    id="star2"
                    name="rate"
                    value="2"
                    onClick={(event) => {
                        return onClickReview(2, event);
                    }}
                    defaultChecked={
                        ratingInfo.average >= 2 && ratingInfo.average < 3
                    }
                />
                <label htmlFor="star2" title="text">
                    2 stars
                </label>
                <input
                    type="radio"
                    id="star1"
                    name="rate"
                    value="1"
                    onClick={(event) => {
                        return onClickReview(1, event);
                    }}
                    defaultChecked={
                        ratingInfo.average >= 1 && ratingInfo.average < 2
                    }
                />
                <label htmlFor="star1" title="text">
                    1 star
                </label>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <p>
                {props.reviews.length > 0
                    ? `${getStarRatingInfo(props.reviews).average} stars (${
                          props.reviews.length
                      } reviews)`
                    : 'no ratings yet'}
            </p>
            <button onClick={() => props.onClose()}>Close</button>
        </div>
    );
}

const onClickReview = async (star: number, event: any) => {
    // TODO allow users to add comments
    const review: Review = {
        star
    };

    try {
        await fetch(`${window.location.origin}/api/user/review`, {
            method: 'POST',
            body: JSON.stringify({ data: review }),
            credentials: 'include'
        });
        event.target.checked = true;
    } catch (message) {
        console.error(message);
    }
};
