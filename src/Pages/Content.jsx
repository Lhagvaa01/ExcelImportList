import React, { useRef, useState, useEffect } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload, MenuProps } from "antd";
import * as XLSX from "xlsx";

import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";

const items = [
  {
    key: "1",
    label: "Доод үнэ",
    price: "15.000",
  },
  {
    key: "2",
    label: "VIP үнэ",
    price: "20.000",
  },
];

// const props = {
//   name: "file",
//   action: "http://localhost:3000/upload",
//   headers: {
//     authorization: "authorization-text",
//   },
//   onChange(info) {
//     if (info.file.status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

const originData = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    code: parseInt(i + 1),
    name: `Edward ${i}`,
    group: `London Park no. ${i}`,
    price: 32,
    price: items[0].price,
    barcode: parseInt(8652145224 + "" + i),
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const ContentPage = () => {
  // SelectPrice;
  const [selectPrice, setSelectPrice] = useState(
    items[0] ? items[0].price : null
  );

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = (record) => record.key === editingKey;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleFileUpload = (event) => {
    setIsLoading(!isLoading);
    const file = event.target.files[0];
    const reader = new FileReader();

    console.log("data");
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const updatedData = jsonData.map((row, i) => ({
        key: i.toString(),
        code: parseInt(row["Барааны код"]),
        name: row["Барааны нэр"],
        group: row["Зарагдах тасаг"],
        price: row["Борлуулах үнэ"],
        selectPrice: 15000,
        barcode: row["Баар код"],
      }));
      setData(updatedData);

      setIsLoading(false);
      message.success(`file uploaded successfully`);
    };

    setIsLoading(false);
    reader.readAsArrayBuffer(file);
  };

  const [data2, setData2] = useState([]);

  const handleFileUpload2 = (e) => {
    // console.log(info.file.status);
    // if (info.file.status === "done") {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      const updatedData = jsonData.map((row, i) => ({
        key: i.toString(),
        code: parseInt(row["Барааны код"]),
        name: row["Барааны нэр"],
        group: row["Зарагдах тасаг"],
        price: row["Борлуулах үнэ"],
        barcode: row["Баар код"],
      }));
      console.log(updatedData);
      setData(updatedData);

      setIsLoading(false);
      setData(jsonData);
      message.success(`${workbook} file uploaded successfully`);
    };
    fileReader.readAsArrayBuffer(file);
    // } else if (info.file.status === "error") {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      group: "",
      price: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const handleMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    setSelectPrice(selectedItem);
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        console.log(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Дотоод код",
      dataIndex: "code",
      width: "10%",
      editable: true,
      ...getColumnSearchProps("code"),
    },
    {
      title: "Барааны нэр",
      dataIndex: "name",
      width: "25%",
      editable: true,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Тасаг",
      dataIndex: "group",
      width: "15%",
      editable: true,
      ...getColumnSearchProps("group"),
    },
    {
      title: "Үнэ",
      dataIndex: "price",
      width: "15%",
      editable: true,
      ...getColumnSearchProps("price"),
    },
    {
      title: "Boucher and PV",
      dataIndex: "selectPrice",
      width: "10%",
      render: (_, record) => {
        // console.log(record.key);
        return (
          <Dropdown
            overlay={
              <Menu onClick={handleMenuClick}>
                {items.map((item) => (
                  <Menu.Item key={item.key}>
                    {item.label}: {item.price}
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button>
              {selectPrice.price} <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
    {
      title: "Баар код",
      dataIndex: "barcode",
      width: "20%",
      editable: true,
      ...getColumnSearchProps("barcode"),
    },
    {
      title: "Засах",
      width: "5%",
      dataIndex: "edit",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Засах
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = secureLocalStorage.getItem("userInfo");
    console.log(JSON.parse(storedUserInfo));
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate(`/Login`);
  };

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "BaraaniiMedeelel"; // Change to your desired file name

    // Prepare data for Excel format
    const exportData = data.map((item) => ({
      "Дотоод код": item.code,
      "Барааны нэр": item.name,
      Тасаг: item.group,
      Үнэ: item.price,
      "Boucher and PV": selectPrice.price,
      "Баар код": item.barcode,
    }));

    // Create a new workbook
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataFile = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(dataFile);

    // Trigger file download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName + fileExtension);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {userInfo != null ? (
        <div>
          <div className="pt-10 px-10">
            <div className="flex pb-5 h-12 w-full  justify-between items-center">
              <div className="flex text-black text-2xl">Барааны мэдээлэл</div>
              <div className="flex gap-10">
                <label
                  onClick={exportToExcel}
                  className="flex  items-center cursor-pointer border border-gray-600 hover:border-blue-600 gap-3 h-12 bg-white hover:text-blue-600 text-black font-bold py-2 px-4 rounded"
                >
                  <UploadOutlined />
                  Export Excel
                </label>
                <label
                  htmlFor="file-upload"
                  className="flex  items-center cursor-pointer border border-gray-600 hover:border-blue-600 gap-3 h-12 bg-white hover:text-blue-600 text-black font-bold py-2 px-4 rounded"
                >
                  <UploadOutlined />
                  Excel file Upload
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden h-12"
                  onChange={handleFileUpload}
                  accept=".xlsx, .xls"
                />
                {/* <Button onClick={exportToExcel}>Export to Excel</Button> */}
              </div>
            </div>
            <Form form={form} component={false}>
              <Table
                loading={isLoading}
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                  onChange: cancel,
                }}
              />
            </Form>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center">
          <div className="grid lg:mt-20 2xl:mx-72 mx-8 mt-3 mb-28 h-96 w-1/3  justify-center items-center bg-white rounded-xl shadow-md">
            <div className="text-black font-bold text-2xl">
              Та эхлээд тэвтрэнэ үү
            </div>
            <button
              onClick={handleLogin}
              className="bg-green-500 text-white rounded-lg px-4 py-2 w-full h-14 items-center justify-center flex"
            >
              Нэвтрэх
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ContentPage;
