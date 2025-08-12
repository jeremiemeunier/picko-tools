import { usePickoClient } from "../../context";
import {
  PickoCardTypes,
  PickoHistoryTypes,
  PickoLiveTypes,
  PickoSparkTypes,
} from "./PickoCard.types";
import {
  AreaChart,
  BarChart,
  ProgressCircle,
  SparkAreaChart,
  Tracker,
} from "@tremor/react";

const PickoCard: React.FC<PickoCardTypes> & {
  Live: React.FC<PickoLiveTypes>;
  History: React.FC<PickoHistoryTypes>;
  Tracker: React.FC;
  Spark: React.FC<PickoSparkTypes>;
} = ({ children }) => {
  return <div className="windmillui picko-root">{children}</div>;
};

const Live = ({ color }: PickoLiveTypes) => {
  return (
    <div className="winmillui picko-live">
      <div className="windmillui grid tac va-center">
        <span className="windmillui text nowrap label">uptime 76%</span>
        <ProgressCircle
          value={96}
          className="gauge"
          radius={22}
          strokeWidth={4}
          color={"green"}
        >
          <ProgressCircle
            value={100}
            className="gauge"
            radius={16}
            strokeWidth={4}
            color={"red"}
          />
        </ProgressCircle>
      </div>
      <div className="windmillui grid tc-1">
        <AreaChart
          data={[]}
          index="day"
          categories={["state"]}
          colors={[color ?? "cyan"]}
          showGradient={true}
          className="h-52 w-full"
          showLegend={false}
          minValue={-0.5}
          maxValue={1.5}
          showYAxis={false}
          showXAxis={false}
          showTooltip={false}
        />
      </div>
    </div>
  );
};
PickoCard.Live = Live;

const History = ({ color }: PickoHistoryTypes) => {
  const { data } = usePickoClient();

  return (
    <div className="winmillui picko-history">
      {Array.isArray(data?.data) ? (
        data.data.map((d, k) => (
          <BarChart
            key={k}
            data={d.stats.history}
            index="day"
            stack
            categories={["active", "inactive"]}
            colors={[color.positive ?? "green", color.negative ?? "red"]}
            showLegend={false}
            showYAxis={false}
          />
        ))
      ) : (
        <BarChart
          data={data?.data.stats.history ?? []}
          index="day"
          stack
          categories={["active", "inactive"]}
          colors={[color.positive ?? "green", color.negative ?? "red"]}
          showLegend={false}
          showYAxis={false}
        />
      )}
    </div>
  );
};
PickoCard.History = History;

const PickoTracker = () => {
  const { data } = usePickoClient();

  return (
    <div className="windmillui picko-tracker">
      {Array.isArray(data?.data) ? (
        data.data.map((d, k) => <Tracker key={k} data={d.stats.tracker} />)
      ) : (
        <Tracker data={data?.data.stats.tracker ?? []} />
      )}
    </div>
  );
};
PickoCard.Tracker = PickoTracker;

const Spark = ({ color }: PickoSparkTypes) => {
  const { data } = usePickoClient();

  return (
    <div className="windmillui picko-spark">
      {Array.isArray(data?.data) ? (
        data.data.map((d, k) => (
          <SparkAreaChart
            key={k}
            data={d.stats.live}
            index="day"
            categories={["state"]}
            colors={[color ?? "cyan"]}
            showGradient={true}
            className="h-16 w-full"
            minValue={-0.5}
            maxValue={1.5}
          />
        ))
      ) : (
        <SparkAreaChart
          data={data?.data.stats.live ?? []}
          index="day"
          categories={["state"]}
          colors={["cyan"]}
          showGradient={true}
          className="h-16 w-full"
          minValue={-0.5}
          maxValue={1.5}
        />
      )}
    </div>
  );
};
PickoCard.Spark = Spark;

export default PickoCard;
