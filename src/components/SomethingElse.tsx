// src/components/SomethingElse.tsx
import React from 'react';
import StyledContainer from './StyledContainer'; // Import StyledContainer
import StyledButton from './StyledButton';       // Import StyledButton
import StyledBadge from './StyledBadge';         // Import StyledBadge

const SomethingElse = () => {
    return (
        <>
            <StyledContainer> {/* Use StyledContainer */}
                <div className="grid gap-2"> {/* Tailwind grid layout */}
                    <div>
                        {/* Empty div - consider removing if not needed */}
                    </div>

                    <h2 id="betsHeading" className="hidden"> {/* Tailwind class for hidden */}
                        Bets Paid: <StyledBadge variant="success"><span id="betsPaid"></span></StyledBadge> {/* Use StyledBadge with variant="success" */}
                    </h2>
                    <br />
                </div>
            </StyledContainer>

            <StyledContainer> {/* Use StyledContainer for chips and reset button */}
                <div className="grid gap-2"> {/* Tailwind grid layout */}
                    <div className="row grid grid-cols-5 gap-2"> {/* 5-column grid for chips */}
                        <div className="col-span-1">
                            <div className="chips"> {/* Consider creating a StyledChip component later */}
                                <input type="image" src="assets/images/chips/chip1.png" id="1dollar" className="w-full" /> {/* Tailwind class for image width */}
                                <div className="centered"><h2>$1</h2></div> {/* Tailwind class for centered text */}
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="chips">
                                <input type="image" src="assets/images/chips/chip5.png" id="5dollar" className="w-full" />
                                <div className="centered"><h2>$5</h2></div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="chips">
                                <input type="image" src="assets/images/chips/chip25.png" id="25dollar" className="w-full" />
                                <div className="centered"><h2>$25</h2></div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="chips">
                                <input type="image" src="assets/images/chips/chip50.png" id="50dollar" className="w-full" />
                                <div className="centered"><h2>$50</h2></div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="chips">
                                <input type="image" src="assets/images/chips/chip100.png" id="100dollar" className="w-full" />
                                <div className="centered hundred"><h5>$100</h5></div> {/* Tailwind class for centered text */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <StyledButton variant="error" className="col-span-12 float-end"> {/* Use StyledButton with variant="error" */}
                            Reset Money
                        </StyledButton>
                    </div>
                </div>
            </StyledContainer>
            <br />
        </>
    );
};

export default SomethingElse;
