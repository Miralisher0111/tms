Procedure S0204RB_F
-- ���������� ����� ����� � 0204 � ������� �������������
( oCount out number   ,    -- ����� ����� � ������
oRepId out number,       -- ������������� ��������������� ������
p_svod     varchar2,      -- 1- � ������� ��������� ���������� �������
-- 2- �� �����
p_filial   varchar2,      --������
p_type     varchar2,      --��� ������
-- 1- � �������� ��������� ������
-- 2- ������� ���������� ��������� ������
-- 3- ����������������� ���������� �����
p_val      varchar2,      --��� ������
-- 000 '��� (��� ��������.��������)'
-- 643 ........
p_dat      date,          --����.����
p_zero     varchar2,   --1- ���������� ��� ������
--2- �� ���������� ������ � �������� �������
iHTEX      varchar2  := 'txt'
)
is
version     CONSTANT char(14) := '->>15102012<<-';
begin

delete DWH_COA_CurrDay; Commit;

if p_dat >= setup.OperDay  then Rep_Svbals.pDate_is_CurrDay (p_svod+1, p_filial, '0' ); end if;

if   iHTEX = 'txt' then S0204RB_F_Txt (oCount, oRepId, p_svod, p_filial, p_type, p_val, p_dat, p_zero);
else Rep_Svbals_Cons_Ht.S0204RB_F (oCount, oRepId, p_svod, p_filial, p_type, p_val, p_dat, p_zero, iHTEX);
end if;
DBMS_Session.Free_Unused_User_Memory;
end ;