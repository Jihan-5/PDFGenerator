import React from 'react';
import { 
    ResponsiveContainer, 
    LineChart, 
    Line, 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    AreaChart, 
    Area,
    PieChart,
    Pie,
    Cell,
    LabelList
} from 'recharts';

const ELEGANT_COLORS = {
    navy: '#2d3748',
    gold: '#D69E2E',
    green: '#38A169',
    red: '#E53E3E',
    gray: '#718096',
    lightGray: '#E2E8F0',
    blue: '#3b82f6',
    teal: '#0d9488',
    purple: '#a855f7',
    orange: '#f97316'
};

// Sample data - replace with actual data from your constants
const niftyTrendData = [
    { name: 'Client', Client: 15000, DII: 12000, FII: 8000, Pro: 5000 },
    { name: 'DII', Client: 18000, DII: 14000, FII: 9000, Pro: 6000 },
    { name: 'FII', Client: 16000, DII: 13000, FII: 10000, Pro: 5500 },
    { name: 'Pro', Client: 17000, DII: 15000, FII: 8500, Pro: 7000 }
];

const adrData = [
    { name: 'INFOSYS', value: 1.2 },
    { name: 'TCS', value: -0.8 },
    { name: 'WIPRO', value: 0.5 },
    { name: 'HCL TECH', value: -1.1 },
    { name: 'TECH MAHINDRA', value: 0.9 }
];

const sectorData = [
    { name: 'IT', value: 1.5 },
    { name: 'Banking', value: -0.3 },
    { name: 'Pharma', value: 2.1 },
    { name: 'Auto', value: -1.2 },
    { name: 'FMCG', value: 0.8 },
    { name: 'Metals', value: 1.8 },
    { name: 'Oil & Gas', value: -0.5 },
    { name: 'Realty', value: 2.3 }
];

const niftyOptionChainData = [
    { strike: '24500', puts: 15000, calls: 8000 },
    { strike: '24600', puts: 12000, calls: 10000 },
    { strike: '24700', puts: 8000, calls: 15000 },
    { strike: '24800', puts: 5000, calls: 18000 },
    { strike: '24900', puts: 3000, calls: 12000 }
];

const bankNiftyOptionChainData = [
    { strike: '50000', puts: 8000, calls: 4000 },
    { strike: '50500', puts: 6000, calls: 5000 },
    { strike: '51000', puts: 4000, calls: 7500 },
    { strike: '51500', puts: 2500, calls: 9000 },
    { strike: '52000', puts: 1500, calls: 6000 }
];

const lsRatioData = [
    { name: 'Client', value: 1.2 },
    { name: 'DII', value: 0.8 },
    { name: 'FII', value: 1.5 },
    { name: 'Pro', value: 0.9 }
];

const futureIndexLongData = [
    { name: 'Client', value: 35 },
    { name: 'DII', value: 25 },
    { name: 'FII', value: 20 },
    { name: 'Pro', value: 20 }
];

const futureIndexShortData = [
    { name: 'Client', value: 30 },
    { name: 'DII', value: 30 },
    { name: 'FII', value: 25 },
    { name: 'Pro', value: 15 }
];

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <g>
      <text x={x + width / 2} y={y - 4} fill="#666" textAnchor="middle" dominantBaseline="middle" fontSize={10}>
        {value > 1000 ? `${(value/1000).toFixed(0)}k` : value}
      </text>
    </g>
  );
};

export const NiftyTrendChart = () => (
    <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={niftyTrendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10, fill: ELEGANT_COLORS.gray }} tickFormatter={(val) => `${val/1000}k`} />
            <Tooltip />
            <Legend wrapperStyle={{fontSize: "12px"}} />
            <Area type="monotone" dataKey="Client" stackId="1" stroke={ELEGANT_COLORS.blue} fill={ELEGANT_COLORS.blue} fillOpacity={0.7} />
            <Area type="monotone" dataKey="DII" stackId="1" stroke={ELEGANT_COLORS.teal} fill={ELEGANT_COLORS.teal} fillOpacity={0.7} />
            <Area type="monotone" dataKey="FII" stackId="1" stroke={ELEGANT_COLORS.gold} fill={ELEGANT_COLORS.gold} fillOpacity={0.7} />
            <Area type="monotone" dataKey="Pro" stackId="1" stroke={ELEGANT_COLORS.purple} fill={ELEGANT_COLORS.purple} fillOpacity={0.7}/>
        </AreaChart>
    </ResponsiveContainer>
);

export const AdrChart = () => (
    <ResponsiveContainer width="100%" height={200}>
        <BarChart layout="vertical" data={adrData} margin={{ top: 5, right: 40, left: 20, bottom: 5 }}>
            <XAxis type="number" domain={[-2, 2]} hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip cursor={{fill: '#f7fafc'}}/>
            <Bar dataKey="value" barSize={25}>
                {adrData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 0 ? ELEGANT_COLORS.green : ELEGANT_COLORS.red} />
                ))}
                 <LabelList dataKey="name" position="insideLeft" fill="#fff" fontSize={12} fontWeight="bold" />
                 <LabelList dataKey="value" position="right" formatter={(value: number) => `${value.toFixed(2)}%`} fontSize={12} fill={ELEGANT_COLORS.navy}/>
            </Bar>
        </BarChart>
    </ResponsiveContainer>
);

export const SectorIndicesChart = () => (
     <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={sectorData} margin={{ top: 5, right: 40, left: 90, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={90} tick={{fontSize: 12, fill: ELEGANT_COLORS.gray}} axisLine={false} tickLine={false} />
            <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} cursor={{fill: '#f7fafc'}} />
            <Bar dataKey="value" barSize={14}>
                {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 0 ? ELEGANT_COLORS.green : ELEGANT_COLORS.red} />
                ))}
                <LabelList dataKey="value" position="right" formatter={(value: number) => `${value.toFixed(2)}%`} fontSize={11} fill={ELEGANT_COLORS.navy} />
            </Bar>
        </BarChart>
    </ResponsiveContainer>
);

export const NiftyOptionChainChart = () => (
    <ResponsiveContainer width="100%" height={250}>
        <BarChart data={niftyOptionChainData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1"/>
            <XAxis dataKey="strike" tick={{fontSize: 10}} />
            <YAxis tick={{fontSize: 10, fill: ELEGANT_COLORS.gray}} tickFormatter={(val) => `${val/1000}k`} />
            <Tooltip />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            <Bar dataKey="puts" name="Puts OI" fill={ELEGANT_COLORS.navy} label={renderCustomizedLabel} radius={[4, 4, 0, 0]} />
            <Bar dataKey="calls" name="Calls OI" fill={ELEGANT_COLORS.gold} label={renderCustomizedLabel} radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
);

export const BankNiftyOptionChainChart = () => (
    <ResponsiveContainer width="100%" height={250}>
        <BarChart data={bankNiftyOptionChainData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1"/>
            <XAxis dataKey="strike" tick={{fontSize: 10}} />
            <YAxis tick={{fontSize: 10, fill: ELEGANT_COLORS.gray}} tickFormatter={(val) => `${val/1000}k`}/>
            <Tooltip />
            <Legend wrapperStyle={{fontSize: "12px"}} />
            <Bar dataKey="puts" name="Puts OI" fill={ELEGANT_COLORS.teal} label={renderCustomizedLabel} radius={[4, 4, 0, 0]} />
            <Bar dataKey="calls" name="Calls OI" fill={ELEGANT_COLORS.orange} label={renderCustomizedLabel} radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
);

export const ParticipantLSRatioChart = () => (
    <ResponsiveContainer width="100%" height={200}>
        <BarChart data={lsRatioData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{fontSize: 12, fill: ELEGANT_COLORS.gray}} />
            <YAxis hide/>
            <Tooltip cursor={{fill: '#f7fafc'}} />
            <Bar dataKey="value" fill={ELEGANT_COLORS.navy} radius={[4, 4, 0, 0]}>
                <LabelList dataKey="value" position="top" fontSize={12} fill={ELEGANT_COLORS.navy} />
            </Bar>
        </BarChart>
    </ResponsiveContainer>
);

const PIE_COLORS = [ELEGANT_COLORS.navy, ELEGANT_COLORS.teal, ELEGANT_COLORS.gold, ELEGANT_COLORS.purple];

const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const FutureIndexLongChart = () => (
    <ResponsiveContainer width="100%" height={200}>
        <PieChart>
            <Pie data={futureIndexLongData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={renderPieLabel}>
                {futureIndexLongData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#fff" strokeWidth={2}/>)}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}%`, name]} />
             <Legend wrapperStyle={{fontSize: "12px", paddingTop: "10px"}}/>
        </PieChart>
    </ResponsiveContainer>
);

export const FutureIndexShortChart = () => (
    <ResponsiveContainer width="100%" height={200}>
        <PieChart>
            <Pie data={futureIndexShortData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={renderPieLabel}>
                {futureIndexShortData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#fff" strokeWidth={2}/>)}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            <Legend wrapperStyle={{fontSize: "12px", paddingTop: "10px"}} />
        </PieChart>
    </ResponsiveContainer>
);