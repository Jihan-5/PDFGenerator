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
import { 
    niftyTrendData, 
    adrData, 
    sectorData, 
    niftyOptionChainData, 
    bankNiftyOptionChainData,
    lsRatioData,
    futureIndexLongData,
    futureIndexShortData
} from '../constants';

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

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <g>
      <text x={x + width / 2} y={y - 4} fill="#666" textAnchor="middle" dominantBaseline="middle" fontSize={8}>
        {value > 1000 ? `${(value/1000).toFixed(0)}k` : value}
      </text>
    </g>
  );
};

export const NiftyTrendChart = () => (
    <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={niftyTrendData} margin={{ top: 5, right: 15, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
            <XAxis dataKey="name" tick={{ fontSize: 8 }} />
            <YAxis tick={{ fontSize: 8, fill: ELEGANT_COLORS.gray }} tickFormatter={(val) => `${val/1000}k`} />
            <Tooltip />
            <Legend wrapperStyle={{fontSize: "10px"}} />
            <Area type="monotone" dataKey="Client" stackId="1" stroke={ELEGANT_COLORS.blue} fill={ELEGANT_COLORS.blue} fillOpacity={0.7} />
            <Area type="monotone" dataKey="DII" stackId="1" stroke={ELEGANT_COLORS.teal} fill={ELEGANT_COLORS.teal} fillOpacity={0.7} />
            <Area type="monotone" dataKey="FII" stackId="1" stroke={ELEGANT_COLORS.gold} fill={ELEGANT_COLORS.gold} fillOpacity={0.7} />
            <Area type="monotone" dataKey="Pro" stackId="1" stroke={ELEGANT_COLORS.purple} fill={ELEGANT_COLORS.purple} fillOpacity={0.7}/>
        </AreaChart>
    </ResponsiveContainer>
);

export const AdrChart = () => (
    <ResponsiveContainer width="100%" height={150}>
        <BarChart layout="vertical" data={adrData} margin={{ top: 5, right: 30, left: 15, bottom: 5 }}>
            <XAxis type="number" domain={[-2, 2]} hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip cursor={{fill: '#f7fafc'}}/>
            <Bar dataKey="value" barSize={20}>
                {adrData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 0 ? ELEGANT_COLORS.green : ELEGANT_COLORS.red} />
                ))}
                 <LabelList dataKey="name" position="insideLeft" fill="#fff" fontSize={10} fontWeight="bold" />
                 <LabelList dataKey="value" position="right" formatter={(value: number) => `${value.toFixed(2)}%`} fontSize={10} fill={ELEGANT_COLORS.navy}/>
            </Bar>
        </BarChart>
    </ResponsiveContainer>
);

export const SectorIndicesChart = () => (
     <ResponsiveContainer width="100%" height={220}>
        <BarChart layout="vertical" data={sectorData} margin={{ top: 5, right: 30, left: 70, bottom: 5 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={70} tick={{fontSize: 10, fill: ELEGANT_COLORS.gray}} axisLine={false} tickLine={false} />
            <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} cursor={{fill: '#f7fafc'}} />
            <Bar dataKey="value" barSize={12}>
                {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 0 ? ELEGANT_COLORS.green : ELEGANT_COLORS.red} />
                ))}
                <LabelList dataKey="value" position="right" formatter={(value: number) => `${value.toFixed(2)}%`} fontSize={9} fill={ELEGANT_COLORS.navy} />
            </Bar>
        </BarChart>
    </ResponsiveContainer>
);

export const NiftyOptionChainChart = () => (
    <ResponsiveContainer width="100%" height={180}>
        <BarChart data={niftyOptionChainData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1"/>
            <XAxis dataKey="strike" tick={{fontSize: 8}} />
            <YAxis tick={{fontSize: 8, fill: ELEGANT_COLORS.gray}} tickFormatter={(val) => `${val/1000}k`} />
            <Tooltip />
            <Legend wrapperStyle={{fontSize: "10px"}}/>
            <Bar dataKey="puts" name="Puts OI" fill={ELEGANT_COLORS.navy} label={renderCustomizedLabel} radius={[3, 3, 0, 0]} />
            <Bar dataKey="calls" name="Calls OI" fill={ELEGANT_COLORS.gold} label={renderCustomizedLabel} radius={[3, 3, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
);

export const BankNiftyOptionChainChart = () => (
    <ResponsiveContainer width="100%" height={180}>
        <BarChart data={bankNiftyOptionChainData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1"/>
            <XAxis dataKey="strike" tick={{fontSize: 8}} />
            <YAxis tick={{fontSize: 8, fill: ELEGANT_COLORS.gray}} tickFormatter={(val) => `${val/1000}k`}/>
            <Tooltip />
            <Legend wrapperStyle={{fontSize: "10px"}} />
            <Bar dataKey="puts" name="Puts OI" fill={ELEGANT_COLORS.teal} label={renderCustomizedLabel} radius={[3, 3, 0, 0]} />
            <Bar dataKey="calls" name="Calls OI" fill={ELEGANT_COLORS.orange} label={renderCustomizedLabel} radius={[3, 3, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
);

export const ParticipantLSRatioChart = () => (
    <ResponsiveContainer width="100%" height={150}>
        <BarChart data={lsRatioData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
            <XAxis dataKey="name" tick={{fontSize: 10, fill: ELEGANT_COLORS.gray}} />
            <YAxis hide/>
            <Tooltip cursor={{fill: '#f7fafc'}} />
            <Bar dataKey="value" fill={ELEGANT_COLORS.navy} radius={[3, 3, 0, 0]}>
                <LabelList dataKey="value" position="top" fontSize={10} fill={ELEGANT_COLORS.navy} />
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
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={9}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const FutureIndexLongChart = () => (
    <ResponsiveContainer width="100%" height={150}>
        <PieChart>
            <Pie data={futureIndexLongData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} labelLine={false} label={renderPieLabel}>
                {futureIndexLongData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#fff" strokeWidth={2}/>)}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}%`, name]} />
             <Legend wrapperStyle={{fontSize: "10px", paddingTop: "8px"}}/>
        </PieChart>
    </ResponsiveContainer>
);

export const FutureIndexShortChart = () => (
    <ResponsiveContainer width="100%" height={150}>
        <PieChart>
            <Pie data={futureIndexShortData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} labelLine={false} label={renderPieLabel}>
                {futureIndexShortData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#fff" strokeWidth={2}/>)}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            <Legend wrapperStyle={{fontSize: "10px", paddingTop: "8px"}} />
        </PieChart>
    </ResponsiveContainer>
);