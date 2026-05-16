#!/usr/bin/env python3
"""Excel自动化三件套：报表生成、库存预警、数据清洗"""
import pandas as pd
import warnings
warnings.filterwarnings('ignore')

# 1. 销售报表自动生成
def generate_sales_report(data_path, output_path):
    """从原始销售数据生成汇总报表"""
    df = pd.read_excel(data_path)
    report = df.groupby(['日期', '产品']).agg({
        '销量': 'sum', '金额': 'sum', '利润': 'sum'
    }).reset_index()
    report.to_excel(output_path, index=False)
    print(f'✅ 报表已生成: {output_path}')
    return report

# 2. 库存预警计算
def inventory_alert(inventory_path, threshold=10):
    """检查库存并标记低库存产品"""
    df = pd.read_excel(inventory_path)
    df['库存状态'] = df['库存量'].apply(
        lambda x: '⚠️ 低库存' if x < threshold else '✓ 正常'
    )
    return df[df['库存状态'] == '⚠️ 低库存']

# 3. 客户数据清洗
def clean_customer_data(data_path, output_path):
    """清洗客户数据：去重、格式化手机号、补全缺失值"""
    df = pd.read_excel(data_path)
    df.drop_duplicates(subset=['手机号'], inplace=True)
    df['手机号'] = df['手机号'].astype(str).str.replace(r'\D', '', regex=True)
    df.fillna({'地址': '未填写', '备注': ''}, inplace=True)
    df.to_excel(output_path, index=False)
    print(f'✅ 清洗完成: {output_path}')
    return df

if __name__ == '__main__':
    print("Excel自动化三件套已就绪")
    print("使用方法: python excel_automation.py")
