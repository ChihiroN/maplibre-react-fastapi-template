import os 
import glob
import argparse
import laspy
from pyproj import Transformer

def get_las_bbox(filepath):
    las=laspy.read(filepath)
    
    head=las.feader
    
    minx,miny,minz=head.min
    maxx,maxy,maxz=head.max
    offsetx,offsety,offsetz=head.offset
    scalex,scaley,scalez=head.scale
    
    minx=minx*scalex+offsetx
    miny=miny*scaley+offsety
    maxx=maxx*scalex+offsetx
    maxy=maxy*scaley+offsety
    
    bbox=[
        [minx,miny],
        [minx,maxy],
        [maxx,maxy],
        [maxx,miny]
    ]
    
    return bbox

def convert_bbox(bbox):
    dst=str(12)# change box crate
    transformer=Transformer.from_crs(dst,"EPSG:4326")
    bbox_converted=[]
    for b in bbox:
        p=transformer.transform(b[0],b[1])
        bbox_converted.append(p)

    return bbox_converted

def convert_bbox_geojson(bbox):
    geojson={
        "type": "FeatureCollection",
        "name": "las_bbox",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
            {
                "type": "Feature",
                "propeties":{
                    "uid":0
                    },
                "geometry":{
                    "type": "Polygon",
                    "coordinates":bbox
                }
            }
        ]
    }
    return geojson
