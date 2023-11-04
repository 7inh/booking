import { Box, BoxProps, Skeleton } from "@mui/material";
import BotItem from "src/components/Bot/BotItem";
import LinkBase from "src/components/Links/LinkBase";

export interface BotListProps extends BoxProps {
    bots: any[];
    row: number;
    column: number;
    isLoading?: boolean;
}

const BotList = ({ bots = [], isLoading, row, column, ...props }: BotListProps) => {
    return (
        <Box
            {...props}
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, 344px)",
                justifyContent: "left",
                gridGap: 12,
            }}
        >
            {isLoading
                ? Array.from({ length: row * column }).map((_, index) => (
                      <Skeleton
                          key={index}
                          variant="rectangular"
                          width="344px"
                          height="96px"
                          sx={{ borderRadius: 2 }}
                      />
                  ))
                : bots.map((bot) => (
                      <LinkBase key={bot.botToken} to={`/kami-store/${bot.botToken}`}>
                          <BotItem
                              botId={bot.botToken}
                              botName={bot.botName}
                              version={bot.version}
                              avatar={bot.avatar}
                              isPublished={bot.isPublic}
                              withPriceV2
                              price={bot.price}
                              overview={{
                                  purchased: bot.sales,
                                  star: bot.avgStar,
                                  numReview: bot.numReview,
                              }}
                              level={bot.level}
                              chatColor={bot.chatColor}
                          />
                      </LinkBase>
                  ))}
        </Box>
    );
};

export default BotList;
