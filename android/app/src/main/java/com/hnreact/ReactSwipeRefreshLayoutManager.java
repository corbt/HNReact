package com.hnreact;

import android.graphics.Color;
import android.support.v4.widget.SwipeRefreshLayout;

import com.facebook.react.uimanager.BaseViewPropertyApplicator;
import com.facebook.react.uimanager.CatalystStylesDiffMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIProp;
import com.facebook.react.uimanager.ViewGroupManager;

public class ReactSwipeRefreshLayoutManager extends ViewGroupManager<ReactSwipeRefreshLayout> {
    public static final String REACT_CLASS = "RCTSwipeRefreshLayout";

    @UIProp(UIProp.Type.STRING)
    public static final String PROP_COLOR = "color";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ReactSwipeRefreshLayout createViewInstance(ThemedReactContext themedReactContext) {
        return new ReactSwipeRefreshLayout(themedReactContext);
    }

    @Override
    public void updateView(ReactSwipeRefreshLayout layout, CatalystStylesDiffMap props) {
//        BaseViewPropertyApplicator.applyCommonViewProperties(layout, props);
        layout.setColorSchemeColors(Color.parseColor(props.getString(PROP_COLOR)));
    }
}
