import React from "react";
import {
    Box,
    Card,
    CardContent,
    Drawer,
    IconButton,
    Link,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export type Article = {
    title: string;
    link: string;
    snippet: string;
    date: string;
    source: string;
    imageUrl: string;
    position: number;
};

export type News = {
    kyeWords: string;
    newsTime: string;
    articles: Article[];
    location: string[];
    postCount: number;
};

export default function EventDrawer({
    open,
    selectedEvent,
    setOpen,
}: {
    selectedEvent?: News;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const theme = useTheme();

    return (
        <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
            <Box maxWidth={"400px"}>
                <Toolbar sx={{ backgroundColor: theme.palette.primary.main }}>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" pl={5}>
                        Event Details
                    </Typography>
                </Toolbar>
                <Box p={2}>
                    <Typography variant="h6" mb={1}>
                        {selectedEvent?.kyeWords}
                    </Typography>
                    <Typography>
                        {new Date(parseInt(selectedEvent!.newsTime)).toLocaleDateString()} {new Date(parseInt(selectedEvent!.newsTime)).toLocaleTimeString()}
                    </Typography>
                    <Typography>
                        {selectedEvent?.location}
                    </Typography>

                </Box>
                {selectedEvent?.articles.map((article: Article) => (
                    <Card key={article.position} sx={{ m: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{article.title}</Typography>
                            <Typography>{article.snippet}</Typography>
                            {article.imageUrl && (
                                <img src={article.imageUrl} alt={article.title} style={{ maxWidth: "100%", height: "auto", margin: "12px 0" }} />
                            )}
                            <Link href={article.link} target="_blank" rel="noopener">
                                {article.source}
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Drawer>
    );
}
