/**
 * Created by century on 2017/7/19.
 */

/**
 * 打开数据库
 * @returns {Boolean}
 */
import {queryAllDeptAndUserTree} from 'api/Initialize'

class Websql {
  static dbname = 'shopbase';
  static version = '1.1';
  static dbdesc = '智能数据库';
  static dbsize = 5 * 1024 * 1024;
  static db = null;

  constructor() {
  }

  openDB() {
    try {
      if (!window.openDatabase) {
        console.log('该浏览器不支持数据库');
        return false;
      }
      Websql.db = window.openDatabase(Websql.dbname, Websql.version, Websql.dbdesc, Websql.dbsize);
      return true;
    } catch (e) {
      if (e == 2) {
        console.log("数据库版本无效");
      } else {
        console.log("未知错误 " + e + ".");
      }
      return false;
    }
  }

  /**
   * 执行一段sql
   * @param sql
   */
  execSql(sql, param, callback) {
    if (Websql.db == null) {
      this.openDB();
    }
    Websql.db.transaction(function (tx) {
      tx.executeSql(sql, param, function (tx, result) {
        if (typeof(callback) == 'function') {
          callback(true)
        }
        return true;
      }, function (tx, error) {
        if (typeof(callback) == 'function') {
          callback(false)
        }
        console.log(sql + "===>", error)
        return false;
      });
    });
  }

  /**
   * @description联系人表
   */
  static userInfo = [
    'id',
    'ryId',//唯一标示
    'label',
    'shortLabel',
    'pid',
    'nodeType',
    'avatarUrl'
  ]

  static userList = [
    'id',    //对应userInfo中的用户名ryId，唯一标示
    'name',  //对应userInfo中的shortLabel
    'icon',
    'cont',
    'num',
    'time'
  ]

  /**
   * 初始化数据库
   */
  initDB() {
    if (Websql.db == null) {
      this.openDB();
    }
    this.createTable('user_info', Websql.userInfo, {
      "id": "varchar(50)",
      "ryId": "varchar(50)",
      "pid": "varchar(50)",
      "nodeType": "int",
      "telephone":"varchar(11)"
    });
    this.createTable('user_list', Websql.userList, {
      "id": "unique",
      "cont": "text",
      "time": "date"
    });
  }


  /**
   * 创建数据库
   * @param tableName     表名称
   * @param fields        表字段
   * @param constraint    约束或者字段的其他补充，可以为空,
   *  格式如：{"id":"integer primary key autoincrement","app_flow_no":"not null"}
   */
  createTable(tableName, fields, constraint) {
    if (Websql.db == null) {
      this.openDB();
    }
    let sql = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (';
    for (let i in fields) {
      let key = "";
      if (typeof(constraint) != "undefined" && typeof(constraint[fields[i]]) != "undefined") {
        key = " " + constraint[fields[i]];
      }
      sql += fields[i] + key + ",";
    }
    sql = sql.substr(0, sql.length - 1);
    sql += ")";
    this.execSql(sql);
  }

  dropTable(tableName) {
    return new Promise((resovle, reject) => {
      this.execSql('drop table if exists ' + tableName, [], (res) => {
        resovle(res)
      })
    })
  }

  /**
   * 更新数据
   * @param tableName 表名称
   * @param setFields 要更新的字段数组
   * @param setParams 要更新的字段对应的参数数组
   * @param whereStr  where语句，如果没有可不传，不包含where关键字，参数用?代替，如：id=? and name=?
   * @param wherParams    where语句用到的参数数组,如['111','2222']
   */
  updateTable(tableName, setFields, setParams, whereStr, wherParams) {
    var sql = "update " + tableName + " set ";
    for (let i in setFields) {
      sql += setFields[i] + "=?,";
    }
    sql = sql.substr(0, sql.length - 1);
    if (typeof(whereStr) != "undefined" && typeof(wherParams) != "undefined" &&
      whereStr != "") {
      sql += " where " + whereStr;
      setParams = setParams.concat(wherParams);
    }
    this.execSql(sql, setParams, function () {
    });
  }

  /**
   * 插入数据
   * @param tableName
   * @param insertFields
   * @param insertParams
   */
  insertTable(tableName, insertFields, insertParams, callback) {
    var sql = "insert into " + tableName + " (";
    var sql2 = " values(";
    for (let i in insertFields) {
      sql += insertFields[i] + ",";
      sql2 += "?,"
    }
    sql = sql.substr(0, sql.length - 1);
    sql2 = sql2.substr(0, sql2.length - 1);
    sql += ")";
    sql2 += ")";
    this.execSql(sql + sql2, insertParams, callback);
  }

  /**
   * 删除数据
   * @param tableName
   * @param whereStr
   * @param wherParams
   */
  deleteRow(tableName, whereStr, wherParams, callback) {
    var sql = "delete from " + tableName;
    if (typeof(whereStr) != "undefined" && typeof(wherParams) != "undefined" &&
      whereStr != "") {
      sql += " where " + whereStr;
    }
    this.execSql(sql, wherParams, callback);
  }

  /**
   * 查询
   * @param tableName
   * @param selectFields  select的字段，用逗号分开，如果全部传"*"
   * @param whereStr      where语句，参数用?代替
   * @param wherParams    参数数组
   * @callback 必填，返回的对象会放在callback函数作为参数传递
   */
  select(tableName, selectFields, whereStr, wherParams, callback) {
    if (Websql.db == null) {
      this.openDB();
    }
    var sql = "SELECT " + selectFields + " FROM " + tableName;
    if (typeof(whereStr) != "undefined" && typeof(wherParams) != "undefined" &&
      whereStr != "") {
      sql += " where " + whereStr;
    }
    Websql.db.transaction(function (tx) {
      tx.executeSql(sql, wherParams, function (tx, results) {
        if (results.rows.length < 1) {
          if (typeof(callback) == 'function') {
            callback(false)
          } //没有数据
        } else {
          if (typeof(callback) == 'function') {
            callback(results.rows)
          }
        }
      }, function (tx, error) {
        console.log(sql + error.message)
        return false;
      });
    });
  }

  /**
   * 插入或更新
   * @param tableName
   * @param insertFields
   * @param insertParams
   * @param key           根据该key来判断是否有数据
   * @param keyVal
   */
  saveOrUpdate(tableName, insertFields, insertParams, key, keyVal) {
    if (typeof(key) != "undefined" && typeof(keyVal) != "undefined" &&
      key != "") {
      this.select(tableName, insertFields[0], key + "=?", [keyVal], function (rows) {
        if (rows) {
          this.updateTable(tableName, insertFields, insertParams, key + "=?", [keyVal]);
        } else {
          insertFields.push(key);
          insertParams.push(keyVal);
          this.insertTable(tableName, insertFields, insertParams, function () {
          });
        }
      })
    } else {
      this.insertTable(tableName, insertFields, insertParams, function () {
      });
    }
  }

  static timer = 0;
  static deptId = null;

  cycle(node) {
    return new Promise((resolve, reject) => {
      Websql.timer = 0;
      this.treeJson(node, (res) => {
        resolve(res);
      })
    });
  }

  treeJson(node,fn) {
    node.map((v, index) => {
      this.insertTable('user_info', Websql.userInfo, [v.id, v.userUuid, v.label, v.shortLabel, v.pid, v.nodeType, v.avatarUrl], res => {
        ++Websql.timer;
        if (v.children && v.children.length > 0) {
          this.treeJson(v.children,fn);
          this.deptId = v.id;
          return
        }
        if(index < (node.length -1)) return;
        if(this.deptId !== v.pid) return;
        return fn(Websql.timer);
      })
    })
  }

  clearInsert(){
    return new Promise((resolve, resject) => {
      this.execSql('delete from user_info where 1=1', [], () => {
        queryAllDeptAndUserTree(1).then(res => {
          if (res.data && res.data.treeData) {
            let lists = res.data.treeData;
            this.cycle(lists).then(res => {
              if (res > 0) return resolve(true);
              resolve(false);
            });
            return
          }
          resolve(false);
        }).catch(err => {
          mui.toast(err.toString());
          resolve(false);
        });
      })
    })
  }

}

export default Websql;
