import React, { useState } from "react";
import { Box } from "@mui/material";
import {
    RMap,
    RLayerVector,
    RStyle,
    RFeature,
    ROverlay,
    RLayerTile,
} from "rlayers";
import locationIcon from "../assets/location_on_FILL0_wght400_GRAD0_opsz24.svg";
import { fromLonLat } from "ol/proj";
import { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import { useQuery } from "@apollo/client";
import { GetDetailsWithPosts } from "../functions/getData";
import EventDrawer from "./EventDrawer";

const coords: Record<string, Coordinate> = {
    origin: [34.851612, 31.046051],
};

export default function Map() {
    const { data } = useQuery(GetDetailsWithPosts);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any | null>();

    const calculateIconSize = (numArticles: number) => {
        const baseSize = 24; 
        const maxSize = 48; 
        return Math.min(baseSize + numArticles * 2, maxSize);
    };
    return (
        <Box width={"70vh"} height={"70vh"}>
            <RMap
                initial={{ center: fromLonLat(coords.origin), zoom: 7 }}
                width={"100%"}
                height={"100%"}
            >
                <RLayerTile url="http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}" />
                <RLayerVector zIndex={10}>
                    <RStyle.RStyle>
                        <RStyle.RIcon
                            src={locationIcon}
                            anchor={[0.5, 1]}
                            opacity={5}
                            // scale={calculateIconSize(selectedEvent?.articles.length || 0)}
                        />
                    </RStyle.RStyle>
                    {data &&
                        data.getDetailsWithPosts.map((event: any, index: number) => (
                            <RFeature
                                geometry={
                                    new Point(
                                        fromLonLat([
                                            parseFloat(event.location[event.location.length - 1]),
                                            parseFloat(event.location[event.location.length - 2])
                                        ])
                                    )
                                }
                                onClick={(e) => {
                                    e.map.getView().fit(e.target.getGeometry()!.getExtent(), {
                                        duration: 250,
                                        maxZoom: 10,
                                    });
                                    setSelectedEvent(event);
                                    setDrawerOpen(true);
                                }}
                                key={`${event.id}-${index}`}
                            >
                                <ROverlay
                                    offset={[0, -10]}
                                    positioning="bottom-center"
                                    onClick={() => {
                                        setDrawerOpen(false);
                                        setSelectedEvent(null);
                                    }}
                                >
                                    {/* <div>
                                        <p>{event.location}</p>
                                    </div> */}
                                </ROverlay>
                            </RFeature>
                        ))}
                </RLayerVector>
            </RMap>
            {drawerOpen && selectedEvent && (
                <EventDrawer
                    open={drawerOpen}
                    selectedEvent={selectedEvent}
                    setOpen={setDrawerOpen}
                />
            )}
        </Box>
    );
}
