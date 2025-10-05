const rankGroups = document.getElementById("rankGroups");
const resultDiv = document.getElementById("result");

const materialKeys = ["エナジー石", "ミスリル", "必要経験値", "レジェンド装備"];

const imageDataEl = document.getElementById("hero_gear_image_data");
const hero_gear_materialImages = {
    "エナジー石": imageDataEl.dataset.essenceStonesUrl,
    "ミスリル": imageDataEl.dataset.mithrilUrl,
    "必要経験値": imageDataEl.dataset.enhancementXpUrl,
    "レジェンド装備": imageDataEl.dataset.mithicGearUrl
};

// 現在/希望レベル用の素材テーブル
const materialTable = {
    // 既存のデータ
    1: ["エナジー石×0", "ミスリル×0", "必要経験値×10", "レジェンド装備×0"],
    2: ["エナジー石×0", "ミスリル×0", "必要経験値×15", "レジェンド装備×0"],
    3: ["エナジー石×0", "ミスリル×0", "必要経験値×20", "レジェンド装備×0"],
    4: ["エナジー石×0", "ミスリル×0", "必要経験値×25", "レジェンド装備×0"],
    5: ["エナジー石×0", "ミスリル×0", "必要経験値×30", "レジェンド装備×0"],
    6: ["エナジー石×0", "ミスリル×0", "必要経験値×35", "レジェンド装備×0"],
    7: ["エナジー石×0", "ミスリル×0", "必要経験値×40", "レジェンド装備×0"],
    8: ["エナジー石×0", "ミスリル×0", "必要経験値×45", "レジェンド装備×0"],
    9: ["エナジー石×0", "ミスリル×0", "必要経験値×50", "レジェンド装備×0"],
    10: ["エナジー石×0", "ミスリル×0", "必要経験値×55", "レジェンド装備×0"],
    11: ["エナジー石×0", "ミスリル×0", "必要経験値×60", "レジェンド装備×0"],
    12: ["エナジー石×0", "ミスリル×0", "必要経験値×65", "レジェンド装備×0"],
    13: ["エナジー石×0", "ミスリル×0", "必要経験値×70", "レジェンド装備×0"],
    14: ["エナジー石×0", "ミスリル×0", "必要経験値×75", "レジェンド装備×0"],
    15: ["エナジー石×0", "ミスリル×0", "必要経験値×80", "レジェンド装備×0"],
    16: ["エナジー石×0", "ミスリル×0", "必要経験値×85", "レジェンド装備×0"],
    17: ["エナジー石×0", "ミスリル×0", "必要経験値×90", "レジェンド装備×0"],
    18: ["エナジー石×0", "ミスリル×0", "必要経験値×95", "レジェンド装備×0"],
    19: ["エナジー石×0", "ミスリル×0", "必要経験値×100", "レジェンド装備×0"],
    20: ["エナジー石×0", "ミスリル×0", "必要経験値×105", "レジェンド装備×0"],
    21: ["エナジー石×0", "ミスリル×0", "必要経験値×110", "レジェンド装備×0"],
    22: ["エナジー石×0", "ミスリル×0", "必要経験値×115", "レジェンド装備×0"],
    23: ["エナジー石×0", "ミスリル×0", "必要経験値×120", "レジェンド装備×0"],
    24: ["エナジー石×0", "ミスリル×0", "必要経験値×125", "レジェンド装備×0"],
    25: ["エナジー石×0", "ミスリル×0", "必要経験値×130", "レジェンド装備×0"],
    26: ["エナジー石×0", "ミスリル×0", "必要経験値×135", "レジェンド装備×0"],
    27: ["エナジー石×0", "ミスリル×0", "必要経験値×140", "レジェンド装備×0"],
    28: ["エナジー石×0", "ミスリル×0", "必要経験値×145", "レジェンド装備×0"],
    29: ["エナジー石×0", "ミスリル×0", "必要経験値×150", "レジェンド装備×0"],
    30: ["エナジー石×0", "ミスリル×0", "必要経験値×160", "レジェンド装備×0"],
    31: ["エナジー石×0", "ミスリル×0", "必要経験値×170", "レジェンド装備×0"],
    32: ["エナジー石×0", "ミスリル×0", "必要経験値×180", "レジェンド装備×0"],
    33: ["エナジー石×0", "ミスリル×0", "必要経験値×190", "レジェンド装備×0"],
    34: ["エナジー石×0", "ミスリル×0", "必要経験値×200", "レジェンド装備×0"],
    35: ["エナジー石×0", "ミスリル×0", "必要経験値×210", "レジェンド装備×0"],
    36: ["エナジー石×0", "ミスリル×0", "必要経験値×220", "レジェンド装備×0"],
    37: ["エナジー石×0", "ミスリル×0", "必要経験値×230", "レジェンド装備×0"],
    38: ["エナジー石×0", "ミスリル×0", "必要経験値×240", "レジェンド装備×0"],
    39: ["エナジー石×0", "ミスリル×0", "必要経験値×250", "レジェンド装備×0"],
    40: ["エナジー石×0", "ミスリル×0", "必要経験値×270", "レジェンド装備×0"],
    41: ["エナジー石×0", "ミスリル×0", "必要経験値×290", "レジェンド装備×0"],
    42: ["エナジー石×0", "ミスリル×0", "必要経験値×310", "レジェンド装備×0"],
    43: ["エナジー石×0", "ミスリル×0", "必要経験値×330", "レジェンド装備×0"],
    44: ["エナジー石×0", "ミスリル×0", "必要経験値×350", "レジェンド装備×0"],
    45: ["エナジー石×0", "ミスリル×0", "必要経験値×370", "レジェンド装備×0"],
    46: ["エナジー石×0", "ミスリル×0", "必要経験値×390", "レジェンド装備×0"],
    47: ["エナジー石×0", "ミスリル×0", "必要経験値×410", "レジェンド装備×0"],
    48: ["エナジー石×0", "ミスリル×0", "必要経験値×430", "レジェンド装備×0"],
    49: ["エナジー石×0", "ミスリル×0", "必要経験値×450", "レジェンド装備×0"],
    50: ["エナジー石×0", "ミスリル×0", "必要経験値×470", "レジェンド装備×0"],
    51: ["エナジー石×0", "ミスリル×0", "必要経験値×490", "レジェンド装備×0"],
    52: ["エナジー石×0", "ミスリル×0", "必要経験値×510", "レジェンド装備×0"],
    53: ["エナジー石×0", "ミスリル×0", "必要経験値×530", "レジェンド装備×0"],
    54: ["エナジー石×0", "ミスリル×0", "必要経験値×550", "レジェンド装備×0"],
    55: ["エナジー石×0", "ミスリル×0", "必要経験値×570", "レジェンド装備×0"],
    56: ["エナジー石×0", "ミスリル×0", "必要経験値×590", "レジェンド装備×0"],
    57: ["エナジー石×0", "ミスリル×0", "必要経験値×610", "レジェンド装備×0"],
    58: ["エナジー石×0", "ミスリル×0", "必要経験値×630", "レジェンド装備×0"],
    59: ["エナジー石×0", "ミスリル×0", "必要経験値×650", "レジェンド装備×0"],
    60: ["エナジー石×0", "ミスリル×0", "必要経験値×680", "レジェンド装備×0"],
    61: ["エナジー石×0", "ミスリル×0", "必要経験値×710", "レジェンド装備×0"],
    62: ["エナジー石×0", "ミスリル×0", "必要経験値×740", "レジェンド装備×0"],
    63: ["エナジー石×0", "ミスリル×0", "必要経験値×770", "レジェンド装備×0"],
    64: ["エナジー石×0", "ミスリル×0", "必要経験値×800", "レジェンド装備×0"],
    65: ["エナジー石×0", "ミスリル×0", "必要経験値×830", "レジェンド装備×0"],
    66: ["エナジー石×0", "ミスリル×0", "必要経験値×860", "レジェンド装備×0"],
    67: ["エナジー石×0", "ミスリル×0", "必要経験値×890", "レジェンド装備×0"],
    68: ["エナジー石×0", "ミスリル×0", "必要経験値×920", "レジェンド装備×0"],
    69: ["エナジー石×0", "ミスリル×0", "必要経験値×950", "レジェンド装備×0"],
    70: ["エナジー石×0", "ミスリル×0", "必要経験値×990", "レジェンド装備×0"],
    71: ["エナジー石×0", "ミスリル×0", "必要経験値×1030", "レジェンド装備×0"],
    72: ["エナジー石×0", "ミスリル×0", "必要経験値×1070", "レジェンド装備×0"],
    73: ["エナジー石×0", "ミスリル×0", "必要経験値×1110", "レジェンド装備×0"],
    74: ["エナジー石×0", "ミスリル×0", "必要経験値×1150", "レジェンド装備×0"],
    75: ["エナジー石×0", "ミスリル×0", "必要経験値×1190", "レジェンド装備×0"],
    76: ["エナジー石×0", "ミスリル×0", "必要経験値×1230", "レジェンド装備×0"],
    77: ["エナジー石×0", "ミスリル×0", "必要経験値×1270", "レジェンド装備×0"],
    78: ["エナジー石×0", "ミスリル×0", "必要経験値×1310", "レジェンド装備×0"],
    79: ["エナジー石×0", "ミスリル×0", "必要経験値×1350", "レジェンド装備×0"],
    80: ["エナジー石×0", "ミスリル×0", "必要経験値×1400", "レジェンド装備×0"],
    81: ["エナジー石×0", "ミスリル×0", "必要経験値×1450", "レジェンド装備×0"],
    82: ["エナジー石×0", "ミスリル×0", "必要経験値×1500", "レジェンド装備×0"],
    83: ["エナジー石×0", "ミスリル×0", "必要経験値×1550", "レジェンド装備×0"],
    84: ["エナジー石×0", "ミスリル×0", "必要経験値×1600", "レジェンド装備×0"],
    85: ["エナジー石×0", "ミスリル×0", "必要経験値×1650", "レジェンド装備×0"],
    86: ["エナジー石×0", "ミスリル×0", "必要経験値×1700", "レジェンド装備×0"],
    87: ["エナジー石×0", "ミスリル×0", "必要経験値×1750", "レジェンド装備×0"],
    88: ["エナジー石×0", "ミスリル×0", "必要経験値×1800", "レジェンド装備×0"],
    89: ["エナジー石×0", "ミスリル×0", "必要経験値×1850", "レジェンド装備×0"],
    90: ["エナジー石×0", "ミスリル×0", "必要経験値×1900", "レジェンド装備×0"],
    91: ["エナジー石×0", "ミスリル×0", "必要経験値×1950", "レジェンド装備×0"],
    92: ["エナジー石×0", "ミスリル×0", "必要経験値×2000", "レジェンド装備×0"],
    93: ["エナジー石×0", "ミスリル×0", "必要経験値×2050", "レジェンド装備×0"],
    94: ["エナジー石×0", "ミスリル×0", "必要経験値×2100", "レジェンド装備×0"],
    95: ["エナジー石×0", "ミスリル×0", "必要経験値×2150", "レジェンド装備×0"],
    96: ["エナジー石×0", "ミスリル×0", "必要経験値×2200", "レジェンド装備×0"],
    97: ["エナジー石×0", "ミスリル×0", "必要経験値×2250", "レジェンド装備×0"],
    98: ["エナジー石×0", "ミスリル×0", "必要経験値×2300", "レジェンド装備×0"],
    99: ["エナジー石×0", "ミスリル×0", "必要経験値×2350", "レジェンド装備×0"],
    100: ["エナジー石×0", "ミスリル×0", "必要経験値×2400", "レジェンド装備×0"],
    101: ["エナジー石×0", "ミスリル×0", "必要経験値×0", "レジェンド装備×2"],
    102: ["エナジー石×0", "ミスリル×0", "必要経験値×2500", "レジェンド装備×0"],
    103: ["エナジー石×0", "ミスリル×0", "必要経験値×2550", "レジェンド装備×0"],
    104: ["エナジー石×0", "ミスリル×0", "必要経験値×2600", "レジェンド装備×0"],
    105: ["エナジー石×0", "ミスリル×0", "必要経験値×2650", "レジェンド装備×0"],
    106: ["エナジー石×0", "ミスリル×0", "必要経験値×2700", "レジェンド装備×0"],
    107: ["エナジー石×0", "ミスリル×0", "必要経験値×2750", "レジェンド装備×0"],
    108: ["エナジー石×0", "ミスリル×0", "必要経験値×2800", "レジェンド装備×0"],
    109: ["エナジー石×0", "ミスリル×0", "必要経験値×2850", "レジェンド装備×0"],
    110: ["エナジー石×0", "ミスリル×0", "必要経験値×2900", "レジェンド装備×0"],
    111: ["エナジー石×0", "ミスリル×0", "必要経験値×2950", "レジェンド装備×0"],
    112: ["エナジー石×0", "ミスリル×0", "必要経験値×3000", "レジェンド装備×0"],
    113: ["エナジー石×0", "ミスリル×0", "必要経験値×3050", "レジェンド装備×0"],
    114: ["エナジー石×0", "ミスリル×0", "必要経験値×3100", "レジェンド装備×0"],
    115: ["エナジー石×0", "ミスリル×0", "必要経験値×3150", "レジェンド装備×0"],
    116: ["エナジー石×0", "ミスリル×0", "必要経験値×3200", "レジェンド装備×0"],
    117: ["エナジー石×0", "ミスリル×0", "必要経験値×3250", "レジェンド装備×0"],
    118: ["エナジー石×0", "ミスリル×0", "必要経験値×3300", "レジェンド装備×0"],
    119: ["エナジー石×0", "ミスリル×0", "必要経験値×3350", "レジェンド装備×0"],
    120: ["エナジー石×0", "ミスリル×10", "必要経験値×0", "レジェンド装備×3"],
    121: ["エナジー石×0", "ミスリル×0", "必要経験値×3500", "レジェンド装備×0"],
    122: ["エナジー石×0", "ミスリル×0", "必要経験値×3550", "レジェンド装備×0"],
    123: ["エナジー石×0", "ミスリル×0", "必要経験値×3600", "レジェンド装備×0"],
    124: ["エナジー石×0", "ミスリル×0", "必要経験値×3650", "レジェンド装備×0"],
    125: ["エナジー石×0", "ミスリル×0", "必要経験値×3700", "レジェンド装備×0"],
    126: ["エナジー石×0", "ミスリル×0", "必要経験値×3750", "レジェンド装備×0"],
    127: ["エナジー石×0", "ミスリル×0", "必要経験値×3800", "レジェンド装備×0"],
    128: ["エナジー石×0", "ミスリル×0", "必要経験値×3850", "レジェンド装備×0"],
    129: ["エナジー石×0", "ミスリル×0", "必要経験値×3900", "レジェンド装備×0"],
    130: ["エナジー石×0", "ミスリル×0", "必要経験値×3950", "レジェンド装備×0"],
    131: ["エナジー石×0", "ミスリル×0", "必要経験値×4000", "レジェンド装備×0"],
    132: ["エナジー石×0", "ミスリル×0", "必要経験値×4050", "レジェンド装備×0"],
    133: ["エナジー石×0", "ミスリル×0", "必要経験値×4100", "レジェンド装備×0"],
    134: ["エナジー石×0", "ミスリル×0", "必要経験値×4150", "レジェンド装備×0"],
    135: ["エナジー石×0", "ミスリル×0", "必要経験値×4200", "レジェンド装備×0"],
    136: ["エナジー石×0", "ミスリル×0", "必要経験値×4250", "レジェンド装備×0"],
    137: ["エナジー石×0", "ミスリル×0", "必要経験値×4300", "レジェンド装備×0"],
    138: ["エナジー石×0", "ミスリル×0", "必要経験値×4350", "レジェンド装備×0"],
    139: ["エナジー石×0", "ミスリル×0", "必要経験値×4400", "レジェンド装備×0"],
    140: ["エナジー石×0", "ミスリル×20", "必要経験値×0", "レジェンド装備×5"],
    141: ["エナジー石×0", "ミスリル×0", "必要経験値×4450", "レジェンド装備×0"],
    142: ["エナジー石×0", "ミスリル×0", "必要経験値×4500", "レジェンド装備×0"],
    143: ["エナジー石×0", "ミスリル×0", "必要経験値×4550", "レジェンド装備×0"],
    144: ["エナジー石×0", "ミスリル×0", "必要経験値×4600", "レジェンド装備×0"],
    145: ["エナジー石×0", "ミスリル×0", "必要経験値×4650", "レジェンド装備×0"],
    146: ["エナジー石×0", "ミスリル×0", "必要経験値×4700", "レジェンド装備×0"],
    147: ["エナジー石×0", "ミスリル×0", "必要経験値×4750", "レジェンド装備×0"],
    148: ["エナジー石×0", "ミスリル×0", "必要経験値×4800", "レジェンド装備×0"],
    149: ["エナジー石×0", "ミスリル×0", "必要経験値×4850", "レジェンド装備×0"],
    150: ["エナジー石×0", "ミスリル×0", "必要経験値×4900", "レジェンド装備×0"],
    151: ["エナジー石×0", "ミスリル×0", "必要経験値×4950", "レジェンド装備×0"],
    152: ["エナジー石×0", "ミスリル×0", "必要経験値×5000", "レジェンド装備×0"],
    153: ["エナジー石×0", "ミスリル×0", "必要経験値×5050", "レジェンド装備×0"],
    154: ["エナジー石×0", "ミスリル×0", "必要経験値×5100", "レジェンド装備×0"],
    155: ["エナジー石×0", "ミスリル×0", "必要経験値×5150", "レジェンド装備×0"],
    156: ["エナジー石×0", "ミスリル×0", "必要経験値×5200", "レジェンド装備×0"],
    157: ["エナジー石×0", "ミスリル×0", "必要経験値×5250", "レジェンド装備×0"],
    158: ["エナジー石×0", "ミスリル×0", "必要経験値×5300", "レジェンド装備×0"],
    159: ["エナジー石×0", "ミスリル×0", "必要経験値×5350", "レジェンド装備×0"],
    160: ["エナジー石×0", "ミスリル×30", "必要経験値×0", "レジェンド装備×5"],
    161: ["エナジー石×0", "ミスリル×0", "必要経験値×5500", "レジェンド装備×0"],
    162: ["エナジー石×0", "ミスリル×0", "必要経験値×5600", "レジェンド装備×0"],
    163: ["エナジー石×0", "ミスリル×0", "必要経験値×5700", "レジェンド装備×0"],
    164: ["エナジー石×0", "ミスリル×0", "必要経験値×5800", "レジェンド装備×0"],
    165: ["エナジー石×0", "ミスリル×0", "必要経験値×5900", "レジェンド装備×0"],
    166: ["エナジー石×0", "ミスリル×0", "必要経験値×6000", "レジェンド装備×0"],
    167: ["エナジー石×0", "ミスリル×0", "必要経験値×6100", "レジェンド装備×0"],
    168: ["エナジー石×0", "ミスリル×0", "必要経験値×6200", "レジェンド装備×0"],
    169: ["エナジー石×0", "ミスリル×0", "必要経験値×6300", "レジェンド装備×0"],
    170: ["エナジー石×0", "ミスリル×0", "必要経験値×6400", "レジェンド装備×0"],
    171: ["エナジー石×0", "ミスリル×0", "必要経験値×6500", "レジェンド装備×0"],
    172: ["エナジー石×0", "ミスリル×0", "必要経験値×6600", "レジェンド装備×0"],
    173: ["エナジー石×0", "ミスリル×0", "必要経験値×6700", "レジェンド装備×0"],
    174: ["エナジー石×0", "ミスリル×0", "必要経験値×6800", "レジェンド装備×0"],
    175: ["エナジー石×0", "ミスリル×0", "必要経験値×6900", "レジェンド装備×0"],
    176: ["エナジー石×0", "ミスリル×0", "必要経験値×7000", "レジェンド装備×0"],
    177: ["エナジー石×0", "ミスリル×0", "必要経験値×7100", "レジェンド装備×0"],
    178: ["エナジー石×0", "ミスリル×0", "必要経験値×7200", "レジェンド装備×0"],
    179: ["エナジー石×0", "ミスリル×0", "必要経験値×7300", "レジェンド装備×0"],
    180: ["エナジー石×0", "ミスリル×40", "必要経験値×0", "レジェンド装備×10"],
    181: ["エナジー石×0", "ミスリル×0", "必要経験値×7500", "レジェンド装備×0"],
    182: ["エナジー石×0", "ミスリル×0", "必要経験値×7600", "レジェンド装備×0"],
    183: ["エナジー石×0", "ミスリル×0", "必要経験値×7700", "レジェンド装備×0"],
    184: ["エナジー石×0", "ミスリル×0", "必要経験値×7800", "レジェンド装備×0"],
    185: ["エナジー石×0", "ミスリル×0", "必要経験値×7900", "レジェンド装備×0"],
    186: ["エナジー石×0", "ミスリル×0", "必要経験値×8000", "レジェンド装備×0"],
    187: ["エナジー石×0", "ミスリル×0", "必要経験値×8100", "レジェンド装備×0"],
    188: ["エナジー石×0", "ミスリル×0", "必要経験値×8200", "レジェンド装備×0"],
    189: ["エナジー石×0", "ミスリル×0", "必要経験値×8300", "レジェンド装備×0"],
    190: ["エナジー石×0", "ミスリル×0", "必要経験値×8400", "レジェンド装備×0"],
    191: ["エナジー石×0", "ミスリル×0", "必要経験値×8500", "レジェンド装備×0"],
    192: ["エナジー石×0", "ミスリル×0", "必要経験値×8600", "レジェンド装備×0"],
    193: ["エナジー石×0", "ミスリル×0", "必要経験値×8700", "レジェンド装備×0"],
    194: ["エナジー石×0", "ミスリル×0", "必要経験値×8800", "レジェンド装備×0"],
    195: ["エナジー石×0", "ミスリル×0", "必要経験値×8900", "レジェンド装備×0"],
    196: ["エナジー石×0", "ミスリル×0", "必要経験値×9000", "レジェンド装備×0"],
    197: ["エナジー石×0", "ミスリル×0", "必要経験値×9100", "レジェンド装備×0"],
    198: ["エナジー石×0", "ミスリル×0", "必要経験値×9200", "レジェンド装備×0"],
    199: ["エナジー石×0", "ミスリル×0", "必要経験値×9300", "レジェンド装備×0"],
    200: ["エナジー石×0", "ミスリル×50", "必要経験値×0", "レジェンド装備×10"]
};

// 追加スライダー用の新しい素材テーブル
const materialTableNew = {
    1: ["エナジー石×10", "ミスリル×0", "必要経験値×0", "レジェンド装備×0"],
    2: ["エナジー石×20", "ミスリル×0", "必要経験値×0", "レジェンド装備×0"],
    3: ["エナジー石×30", "ミスリル×0", "必要経験値×0", "レジェンド装備×0"],
    4: ["エナジー石×40", "ミスリル×0", "必要経験値×0", "レジェンド装備×0"],
    5: ["エナジー石×50", "ミスリル×0", "必要経験値×0", "レジェンド装備×0"],
    6: ["エナジー石×60", "ミスリル×0", "必要経験値×0", "レジェンド装備×0"],
    7: ["エナジー石×70", "ミスリル×0", "必要経験値×0", "レジェンド装備×0"],
    8: ["エナジー石×80", "ミスリル×0", "必要経験値×0", "レジェンド装備×0"],
    9: ["エナジー石×90", "ミスリル×0", "必要経験値×0", "レジェンド装備×0"],
    10: ["エナジー石×100", "ミスリル×0", "必要経験値×0", "レジェンド装備×0"],
    11: ["エナジー石×110", "ミスリル×0", "必要経験値×0", "レジェンド装備×1"],
    12: ["エナジー石×120", "ミスリル×0", "必要経験値×0", "レジェンド装備×2"],
    13: ["エナジー石×130", "ミスリル×0", "必要経験値×0", "レジェンド装備×3"],
    14: ["エナジー石×140", "ミスリル×0", "必要経験値×0", "レジェンド装備×4"],
    15: ["エナジー石×150", "ミスリル×0", "必要経験値×0", "レジェンド装備×5"],
    16: ["エナジー石×160", "ミスリル×0", "必要経験値×0", "レジェンド装備×6"],
    17: ["エナジー石×170", "ミスリル×0", "必要経験値×0", "レジェンド装備×7"],
    18: ["エナジー石×180", "ミスリル×0", "必要経験値×0", "レジェンド装備×8"],
    19: ["エナジー石×190", "ミスリル×0", "必要経験値×0", "レジェンド装備×9"],
    20: ["エナジー石×200", "ミスリル×0", "必要経験値×0", "レジェンド装備×10"]
};

let count = 0;

function addOne() {
    count += 1;
    document.getElementById('counter').textContent = count;

    const div = document.createElement("div");
    // 省略：追加したHTMLを挿入
    div.innerHTML = `
        <strong class="equipment-title">装備${count}</strong><br><br>
        <label class="slider-label-container">現在Lv:
            <span id="sval${count}" class="slider-label">0</span>
        </label>
        <button type="button" class="level-button plus" data-target="start${count}">+</button>
        <button type="button" class="level-button minus" data-target="start${count}">-</button>
        <input type="range" id="start${count}" min="0" max="200" value="0" step="1" class="slider blue">
        <br><br>
        <label class="slider-label-container">希望Lv:
            <span id="eval${count}" class="slider-label">+100</span>
        </label>
        <button type="button" class="level-button plus" data-target="end${count}">+</button>
        <button type="button" class="level-button minus" data-target="end${count}">-</button>
        <input type="range" id="end${count}" min="0" max="200" value="200" step="1" class="slider red">
        <br><br>
        <label class="slider-label-container">製錬現在Lv:
            <span id="newvalStart${count}" class="slider-label">0</span>
        </label>
        <button type="button" class="level-button plus" data-target="newsliderStart${count}">+</button>
        <button type="button" class="level-button minus" data-target="newsliderStart${count}">-</button>
        <input type="range" id="newsliderStart${count}" min="0" max="20" value="0" step="1" class="slider">
        <br><br>
        <label class="slider-label-container">製錬希望Lv:
            <span id="newvalEnd${count}" class="slider-label">20</span>
        </label>
        <button type="button" class="level-button plus" data-target="newsliderEnd${count}">+</button>
        <button type="button" class="level-button minus" data-target="newsliderEnd${count}">-</button>
        <input type="range" id="newsliderEnd${count}" min="0" max="20" value="20" step="1" class="slider">
        
    `;
    rankGroups.appendChild(div);

    const currentCount = count;
    const sliders = [
        { id: `start${currentCount}`, label: `sval${currentCount}` },
        { id: `end${currentCount}`, label: `eval${currentCount}` },
        { id: `newsliderStart${currentCount}`, label: `newvalStart${currentCount}` },
        { id: `newsliderEnd${currentCount}`, label: `newvalEnd${currentCount}` }
    ];

    sliders.forEach(s => {
        const sliderEl = document.getElementById(s.id);
        if (sliderEl) {
            sliderEl.addEventListener("input", function () {
                updateLabel(this.value, s.label);
                updateTable();
            });
        }
    });

    const minusButtons = div.querySelectorAll('.level-button.minus');
    const plusButtons = div.querySelectorAll('.level-button.plus');

    minusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const slider = document.getElementById(targetId);
            if (slider && parseInt(slider.value) > parseInt(slider.min)) {
                slider.value = parseInt(slider.value) - 1;
                slider.dispatchEvent(new Event('input'));
            }
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const slider = document.getElementById(targetId);
            if (slider && parseInt(slider.value) < parseInt(slider.max)) {
                slider.value = parseInt(slider.value) + 1;
                slider.dispatchEvent(new Event('input'));
            }
        });
    });
    updateTable();
}

function updateLabel(val, spanId) {
    const num = parseInt(val);
    const label = document.getElementById(spanId);
    if (!label) return;
    if (spanId.startsWith('sval') || spanId.startsWith('newval')) {
        label.textContent = num;
    } else {
        label.textContent = '+' + num;
    }
}

function subOne() {
    if (count > 0) {
        const lastChild = rankGroups.lastElementChild;
        if (lastChild) {
            rankGroups.removeChild(lastChild);
        }
        count -= 1;
        document.getElementById('counter').textContent = count;
        updateTable();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const restoreData = urlParams.get('data');
    const saveButton = document.getElementById('saveButton');
    const clearButton = document.getElementById('clearButton');

    if (restoreData) {
        try {
            const inputData = JSON.parse(decodeURIComponent(restoreData));
            const sliderCounts = inputData.length / 4;
            for (let i = 0; i < sliderCounts; i++) {
                addOne();
            }
            inputData.forEach(item => {
                const slider = document.getElementById(item.id);
                if (slider) {
                    slider.value = item.value;
                    updateLabel(item.value, item.id.replace('start', 'sval').replace('end', 'eval').replace('newsliderStart', 'newvalStart').replace('newsliderEnd', 'newvalEnd'));
                }
            });
            updateTable();
        } catch (e) {
            console.error('復元データの解析に失敗しました:', e);
            addOne();
        }
    } else {
        addOne();
    }

    if (saveButton) {
        saveButton.addEventListener('click', function () {
            const resultTitle = "領主宝石計算結果";
            const resultHtml = resultDiv.innerHTML;
            const inputData = [];
            const sliderElements = rankGroups.querySelectorAll('input[type="range"]');
            sliderElements.forEach(slider => {
                inputData.push({
                    id: slider.id,
                    value: slider.value
                });
            });

            fetch('/accounts/save_calculation_result/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    title: resultTitle,
                    result_html: resultHtml,
                    input_data: inputData
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('計算結果がプロフィールに保存されました！');
                    } else {
                        alert('保存に失敗しました: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('通信エラーが発生しました。');
                });
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', function () {
            while (count > 0) {
                subOne();
            }
            addOne();
            updateTable();
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});

function updateTable() {
    const totalsPerSet = Array(count).fill(null).map(() => {
        return { "エナジー石": 0, "ミスリル": 0, "必要経験値": 0, "レジェンド装備": 0 };
    });
    const totalAll = { "エナジー石": 0, "ミスリル": 0, "必要経験値": 0, "レジェンド装備": 0 };
    let hasCalculatedMaterials = false;

    for (let i = 1; i <= count; i++) {
        const startEl = document.getElementById(`start${i}`);
        const endEl = document.getElementById(`end${i}`);
        const newStartEl = document.getElementById(`newsliderStart${i}`);
        const newEndEl = document.getElementById(`newsliderEnd${i}`);

        if (!startEl || !endEl || !newStartEl || !newEndEl) {
            continue;
        }

        const from = parseInt(startEl.value);
        const to = parseInt(endEl.value);
        const newStart = parseInt(newStartEl.value);
        const newEnd = parseInt(newEndEl.value);

        // 現在/希望レベルの計算
        if (from !== to && from < to) {
            for (let lv = from; lv < to; lv++) {
                if (!materialTable[lv + 1]) continue;
                materialTable[lv + 1].forEach(entry => {
                    const [name, val] = entry.split("×");
                    const n = parseInt(val);
                    totalsPerSet[i - 1][name] += n;
                    totalAll[name] += n;
                    if (n > 0) hasCalculatedMaterials = true;
                });
            }
        }

        // 製錬レベルの計算
        if (newStart !== newEnd && newStart < newEnd) {
            for (let lv = newStart; lv < newEnd; lv++) {
                if (!materialTableNew[lv + 1]) continue;
                materialTableNew[lv + 1].forEach(entry => {
                    const [name, val] = entry.split("×");
                    const n = parseInt(val);
                    totalsPerSet[i - 1][name] += n;
                    totalAll[name] += n;
                    if (n > 0) hasCalculatedMaterials = true;
                });
            }
        }
    }

    const imageDataEl = document.getElementById("hero_gear_image_data");
    const hero_gear_materialImages = {
        "エナジー石": imageDataEl.dataset.essenceStonesUrl,
        "ミスリル": imageDataEl.dataset.mithrilUrl,
        "必要経験値": imageDataEl.dataset.enhancementXpUrl,
        "レジェンド装備": imageDataEl.dataset.mithicGearUrl
    };

    let html = `<h3>合計必要素材</h3><table class="styled-table"><tr><th>セット</th>`;
    materialKeys.forEach(key => {
        html += `<th><img src="${hero_gear_materialImages[key]}" width="32"><br>${key}</th>`;
    });
    html += `</tr>`;

    for (let i = 0; i < count; i++) {
        html += `<tr><td>装備${i + 1}</td>`;
        materialKeys.forEach(key => {
            html += `<td>${totalsPerSet[i][key]}</td>`;
        });
        html += `</tr>`;
    }

    html += `<tr class="total-row"><td><strong>合計</strong></td>`;
    materialKeys.forEach(key => {
        html += `<td><strong>${totalAll[key]}</strong></td>`;
    });
    html += `</tr></table>`;
    resultDiv.innerHTML = html;

    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        if (hasCalculatedMaterials) {
            saveButton.style.display = 'block';
        } else {
            saveButton.style.display = 'none';
        }
    }
}