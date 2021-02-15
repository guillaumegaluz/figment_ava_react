import "./App.css";
import { data } from "./data";
import styled from "styled-components";
import { countBy, mean, max } from "lodash";
import { ResponsiveBar } from "@nivo/bar";

export default function App() {
  // validators count
  const validatorsCount = data.result.validators.length;

  // uptime
  const uptimeAverage = mean(
    data.result.validators.map((v) => parseFloat(v.uptime))
  );
  const uptimeAverageFormatted = Math.round(uptimeAverage * 10000) / 10000;

  // stakes
  const stakeAmountAverage = mean(
    data.result.validators.map((v) => parseFloat(v.stakeAmount))
  );
  const stakeAmountAverageFormatted = Math.round(stakeAmountAverage);

  // reward
  const rewards = data.result.validators.map((v) =>
    Math.round(parseFloat(v.potentialReward))
  );
  const rewardAverage = mean(rewards);
  const rewardAverageFormatted = Math.round(rewardAverage);
  const maxReward = max(rewards);

  const rewardVsMax = rewards.map(
    (r) => Math.floor(Math.floor((r / maxReward) * 100) / 10) * 10
  );

  const rewardsDistribution = countBy(rewardVsMax);
  const rewardsDistributionForChart = Object.keys(rewardsDistribution).map(
    (percentile) => {
      return {
        percentile,
        count: rewardsDistribution[percentile],
      };
    }
  );

  return (
    <div className="App">
      <header className="App-header">
        <Wrapper>
          <Title>Avalanche P Chain Analytics</Title>

          <Row>
            <Left>Number of validators</Left>
            <Right>{validatorsCount}</Right>
          </Row>

          <Row>
            <Left>Average uptime</Left>
            <Right>{uptimeAverageFormatted}</Right>
          </Row>

          <Row>
            <Left>Average stake amount</Left>
            <Right>{stakeAmountAverageFormatted}</Right>
          </Row>

          <Row>
            <Left>Max potential reward</Left>
            <Right>{maxReward}</Right>
          </Row>

          <Row>
            <Left>Average potential reward</Left>
            <Right>{rewardAverageFormatted}</Right>
          </Row>

          <ChartLabel>
            Distribution of rewards (as percentiles vs the max)
          </ChartLabel>
          <ChartWrapper>
            <ResponsiveBar
              data={rewardsDistributionForChart}
              keys={["count"]}
              indexBy="percentile"
              margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
              padding={0.2}
              theme={{
                axis: {
                  fontSize: "14px",
                  tickColor: "#eee",
                  ticks: {
                    line: {
                      stroke: "#555555",
                    },
                    text: {
                      fill: "#ffffff",
                    },
                  },
                  legend: {
                    text: {
                      fill: "#aaaaaa",
                    },
                  },
                },
                grid: {
                  line: {
                    stroke: "#555555",
                  },
                },
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "reward percentile",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "food",
                legendPosition: "middle",
                legendOffset: -40,
              }}
            />
          </ChartWrapper>
        </Wrapper>
      </header>
    </div>
  );
}

const Wrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  font-size: 14px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 60px;
`;

const Row = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: solid 1px grey;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Left = styled.div``;
const Right = styled.div``;

const ChartLabel = styled.div`
  margin: 50px 0 0 0;
`;

const ChartWrapper = styled.div`
  width: 500px;
  height: 300px;
`;
