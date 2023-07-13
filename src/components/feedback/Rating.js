import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
const Rate = ({handleRating, id}) => {
    const [rate, setRate] = useState(0);
    return (
        <Container>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                    <label>
                        <Radio
                            type="radio"
                            required
                            id={item}
                            value={givenRating}
                            onClick={(event) => {
                                setRate(givenRating);
                                handleRating(event.target.value, id)

                            }}

                        />
                        <Rating>
                            <FaStar
                                color={
                                    givenRating < rate || givenRating === rate
                                        ? "yellow"
                                        : "rgb(192,192,192)"
                                }
                            />
                        </Rating>
                    </label>
                );
            })}
        </Container>
    );
};

export default Rate;