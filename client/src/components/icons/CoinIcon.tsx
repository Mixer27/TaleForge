import { SvgIcon } from "@mui/material";

interface Props {
    color?: string,
}

const CoinIcon: React.FC<Props> = (props) => {
    return (
        <SvgIcon viewBox="0 0 512 512" sx={{ marginLeft: 1, marginBottom: 0.5 }}> {/* Updated to fit large SVG paths */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 512 512"
                strokeWidth={1.5}
                stroke="black"
            ></svg>
            <g color={props.color}>
                <path d="M326.27,86.016l57.667,15.304c1.504,0.307,2.726,1.536,3.072,3.049l15.203,57.667
		c0.41,1.693,1.899,2.883,3.631,2.883c1.749,0,3.222-1.19,3.615-2.883l15.226-57.667c0.323-1.512,1.552-2.742,3.056-3.049
		l57.675-15.304c1.686-0.316,2.884-1.82,2.884-3.553c0-1.749-1.198-3.222-2.884-3.56L427.74,63.606
		c-1.504-0.322-2.733-1.536-3.056-3.048L409.458,2.891C409.064,1.213,407.591,0,405.843,0c-1.732,0-3.222,1.213-3.631,2.891
		l-15.203,57.667c-0.346,1.512-1.567,2.726-3.072,3.048L326.27,78.903c-1.702,0.339-2.883,1.812-2.883,3.56
		C323.387,84.196,324.569,85.701,326.27,86.016z"/>
                <path d="M385.253,326.53l-26.176-6.939c-0.685-0.158-1.244-0.694-1.394-1.386l-6.9-26.175
		c-0.181-0.764-0.851-1.308-1.646-1.308c-0.78,0-1.457,0.544-1.646,1.308l-6.9,26.175c-0.158,0.693-0.709,1.228-1.394,1.386
		l-26.167,6.939c-0.772,0.15-1.316,0.828-1.316,1.615c0,0.788,0.544,1.466,1.316,1.623l26.167,6.932
		c0.685,0.141,1.236,0.709,1.394,1.402l6.9,26.159c0.189,0.764,0.866,1.308,1.646,1.308c0.796,0,1.465-0.544,1.646-1.308l6.9-26.159
		c0.15-0.693,0.709-1.261,1.394-1.402l26.176-6.932c0.756-0.157,1.308-0.835,1.308-1.623
		C386.56,327.357,386.009,326.68,385.253,326.53z"/>
                <path d="M37.841,140.075l41.204,10.917c1.086,0.229,1.946,1.104,2.205,2.19l10.854,41.204
		c0.299,1.221,1.363,2.064,2.6,2.064c1.244,0,2.3-0.843,2.592-2.064l10.862-41.204c0.229-1.086,1.119-1.961,2.198-2.19
		l41.212-10.917c1.205-0.252,2.063-1.339,2.063-2.568c0-1.229-0.858-2.284-2.063-2.536l-41.212-10.934
		c-1.079-0.236-1.969-1.086-2.198-2.174L97.296,80.636c-0.292-1.198-1.347-2.048-2.592-2.048c-1.236,0-2.3,0.85-2.6,2.048
		l-10.854,41.228c-0.26,1.087-1.119,1.937-2.205,2.174l-41.204,10.934c-1.229,0.252-2.072,1.307-2.072,2.536
		C35.769,138.736,36.612,139.824,37.841,140.075z"/>
                <path d="M396.595,276.897c-7.877-9.216-19.133-17.392-33.012-24.245h0.016c-27.68-13.706-65.638-22.094-107.583-22.118
		l-0.118,0.007v-0.007c-27.546,0.007-53.398,3.623-75.745,9.988c-22.347,6.365-41.156,15.439-54.705,26.467l0.023-0.016
		c-9.05,7.357-15.706,15.565-19.4,24.49c-2.112,5.065-3.222,10.405-3.214,15.816c0,4.451,3.608,8.066,8.066,8.066
		c4.459,0,8.066-3.615,8.066-8.066c0.008-3.253,0.623-6.348,1.985-9.657c2.355-5.734,7.168-12.051,14.659-18.117l0.023-0.016
		c11.154-9.137,28.184-17.581,48.916-23.449c20.732-5.916,45.198-9.374,71.326-9.366h0.425c39.629,0.008,75.429,8.145,100.1,20.433
		l0.024,0.008c12.382,6.097,21.937,13.264,27.884,20.259c2.994,3.506,5.12,6.948,6.483,10.248c1.702,4.12,6.412,6.074,10.532,4.372
		c4.12-1.701,6.073-6.412,4.372-10.531C403.613,286.373,400.542,281.497,396.595,276.897z"/>
                <path d="M485.912,271.966c-3.403-8.208-8.058-15.84-13.675-22.89c-5.616-7.042-12.185-13.517-19.496-19.472
		l-0.448-0.362l0.433,0.362c-21.961-17.849-50.862-31.492-84.338-41.07h-0.008c-33.508-9.523-71.735-14.84-112.38-14.84
		c-30.972,0-60.527,3.088-87.67,8.767c-27.144,5.68-51.877,13.95-73.208,24.489l-0.016,0.008
		c-21.307,10.571-39.424,23.442-52.87,39.14l0.244-0.3l-0.252,0.3c-6.711,7.862-12.256,16.487-16.14,25.868
		c-3.891,9.389-6.057,19.511-6.05,29.932v81.873c-0.007,10.43,2.159,20.559,6.05,29.948c3.403,8.208,8.059,15.832,13.675,22.882
		c5.624,7.05,12.185,13.517,19.494,19.472l0.016,0.008c21.961,17.833,50.853,31.507,84.33,41.069l0.18,0.04
		C177.255,506.683,215.418,511.992,256,512h0.008c30.964-0.008,60.518-3.096,87.662-8.775c27.144-5.68,51.877-13.958,73.208-24.49
		l0.015-0.015c21.307-10.572,39.416-23.45,52.87-39.133l0.008-0.015c6.711-7.846,12.248-16.462,16.132-25.852l-0.244,0.575
		l0.252-0.575c3.883-9.39,6.05-19.519,6.05-29.948v-81.873C491.961,291.477,489.795,281.355,485.912,271.966z M72.838,426.409
		c-2.481-2.339-4.797-4.718-6.86-7.121c-4.892-5.734-8.563-11.602-11.013-17.51c-2.45-5.923-3.678-11.886-3.678-18.006v-37.116
		c4.781,5.9,10.429,11.469,16.817,16.684c1.537,1.236,3.112,2.458,4.734,3.671V426.409z M118.083,454.932
		c-3.111-1.355-6.175-2.742-9.114-4.206c-6.845-3.387-13.147-7.003-18.896-10.775v-61.676c8.578,4.923,17.951,9.436,28.01,13.501
		V454.932z M174.111,472.505c-14.194-3.002-27.514-6.759-39.794-11.146h1.016v-63.29c3.946,1.307,7.995,2.544,12.122,3.726
		c8.539,2.426,17.456,4.552,26.656,6.404V472.505z M247.375,480.657c-19.519-0.394-38.282-2.174-56.021-5.041v-64.401
		c17.841,2.756,36.604,4.371,56.021,4.75V480.657z M322.804,475.23c-18.369,3.064-37.856,4.986-58.179,5.38v-64.607
		c20.196-0.394,39.708-2.15,58.179-5.081V475.23z M378.833,460.965c-6.081,2.206-12.414,4.254-19.008,6.128
		c-6.364,1.812-12.996,3.426-19.786,4.907v-64.228c13.651-2.82,26.632-6.333,38.794-10.437V460.965z M424.085,438.484
		c-8.16,5.593-17.55,10.792-28.018,15.517v-63.125c5.041-2.088,9.933-4.278,14.604-6.585c4.671-2.324,9.137-4.758,13.414-7.279
		V438.484z M460.713,383.771c0,6.12-1.228,12.084-3.686,18.006c-3.151,7.656-8.436,15.274-15.707,22.576v-58.242h-1.024
		c7.152-5.459,13.493-11.28,18.826-17.51c0.543-0.638,1.063-1.284,1.59-1.93V383.771z M457.027,319.89
		c-4.253,10.334-12.367,20.59-24.024,30.082c-17.448,14.241-42.756,26.593-73.177,35.233
		c-30.412,8.665-65.922,13.667-103.825,13.667c-57.746,0.024-109.978-11.658-147.031-30.035
		c-18.526-9.16-33.209-19.967-42.992-31.444c-4.892-5.727-8.563-11.595-11.013-17.502c-2.45-5.924-3.678-11.879-3.678-17.991
		s1.228-12.067,3.678-17.991c4.27-10.342,12.367-20.598,24.033-30.074c17.456-14.25,42.756-26.608,73.177-35.249
		c30.413-8.656,65.93-13.651,103.826-13.651c57.746-0.032,109.969,11.658,147.023,30.027c18.534,9.153,33.224,19.976,42.992,31.436
		c4.899,5.727,8.57,11.595,11.012,17.51c2.458,5.924,3.686,11.878,3.686,17.991S459.485,313.966,457.027,319.89z"/>
        </g>
        </SvgIcon>
    );
};

export { CoinIcon };
