def encode_features(feat):
    # 简化：只用数值特征（真实可用 OneHotEncoder）
    return [
        feat["avg_temp"],
        feat["rainfall"],
        feat["sunlight"],
        feat["ph"],
        feat["price"],
        feat["volatility"],
        feat["export_ratio"]
    ]