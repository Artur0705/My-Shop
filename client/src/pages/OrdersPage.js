import React from "react";

function OrdersPage() {
  return (
    <div className="content content-margined">
      <div className="order-header"></div>
      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>DELIVERED</th>
              <th>DELIVERED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
export default OrdersPage;

//                                     <<<PAGE IS NOT COMPLETE>>>
//                                      FOR FUTURE DEVELOPMENT
