import React, { useState, useEffect, useRef } from 'react';

import { Grid } from '@mui/material';

import PersonCard from './PersonCard';

function InfinitePeopleGrid({ searchResults, setQueryAndPage, hasNextPage, loading, error }: any) {
    const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && hasNextPage) {
                    setQueryAndPage((prevState: any) => ({
                        ...prevState,
                        query: prevState.query,
                        page: prevState.page + 1
                    }))
                }
            })
    );

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    return (
        
        <>
            <Grid container spacing={{ xs: 2, sm: 2, md: 2 }} columns={{ xs: 4, md: 9, lg: 12 }}>
                {searchResults.map((person: any, i: number) => {
                    return i === searchResults.length - 1 && !loading && hasNextPage ? (
                
                    
                        <Grid item xs={4} md={4} lg={4}>
                            <div key={i} ref={setLastElement}> 
                                <PersonCard info={person} />
                            </div>
                        </Grid>
                    
                    
                ) : (
                    <Grid item xs={4} md={4} lg={4} key={i}>
                        <PersonCard info={person} />
                    </Grid>
                )})}
                
            </Grid>
        </>
    )
}

export default InfinitePeopleGrid